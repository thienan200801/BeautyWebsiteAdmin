import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { message } from "antd";
import * as client from "api/index";
import { callNotification } from "App";
import { BLOG_STATUS } from "utils/constant";

import { startLoading, stopLoading } from "./loaderSlice";

// sắp xếp danh sách theo đã ghim && đã gửi mail
const simpleSoft = (pinned, mailed) => {
  if (mailed && pinned) return 1
  if (pinned) return 1
  if (mailed) return 0
  return -1
}

const blogAdapter = createEntityAdapter({
  sortComparer: (prev, next) => simpleSoft(next.stick_to_top, next.send_mail),
});

const initialState = blogAdapter.getInitialState({
  currentBlog: null,
  media: null,
  currentId: null,
  blogPath: null,
});

export const getBlog = createAsyncThunk(
  "blog/search",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "blog";
    let response;
    try {
      response = await client.get(url, payload);
      if (response.status == 200) {
        dispatch(setBlog(response.data));
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const getBlogWithId = createAsyncThunk(
  "blog/get",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    const { id } = payload;

    dispatch(startLoading());
    let url = `blog/${id}`;

    let response;
    try {
      response = await client.get(url, {});
      if (response.status == 200 || response.status == 204) {
        dispatch(setCurrentBlog(response.data));
        dispatch(setBlogmedia(response.data.media));
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      console.log(error);
      dispatch(stopLoading());
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "blog/create";
    const { blog, status } = payload;
    console.log("taoj moi thanh cong");
    let response;
    try {
      response = await client.post(url, { status: status, ...blog });
      if (response.status == 200) {
        dispatch(
          editBlog({ id: response.data.id, blog: { product: blog.product } })
        );
        dispatch(setBlogId(response.data.id));
        dispatch(setBlogPath(response.data.path));
        dispatch(stopLoading());
      }
    } catch (error) {
      message.error(error.response.data.error);
      dispatch(stopLoading());
    }
  }
);

//payload is blogid
export const deleteBlogApi = createAsyncThunk(
  "blog/delete",
  async (id, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `blog/${id}`;
    let response;
    try {
      response = await client.deleteItem(url, id);
      if (response.status == 200) {
        dispatch(deleteBlog(id));
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error("Xoá không thành công"));
      dispatch(getBlog());
      dispatch(stopLoading());
    }
  }
);

export const editBlog = createAsyncThunk(
  "blog/modify",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    const { id, blog } = payload;
    let url = `blog/${id}`;
    let response;
    try {
      response = await client.patch(url, { ...blog });
      if (response.status == 200) {
        dispatch(setCurrentBlog(response.data));
        dispatch(setBlogmedia(response.data.media));

        message.success("Lưu thành công");
        dispatch(stopLoading());
      }
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(stopLoading());
    }
  }
);

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      blogAdapter.setAll(state, action);
    },
    clearBlogData: (state, action) => {
      state.currentBlog = null;
    },
    initBlog: (state, action) => {
      const init = {
        title: null,
        content: null,
        tag: undefined,
        category: undefined,
        feature_image: undefined,
      };
      state.currentBlog = init;
    },
    setCurrentBlog: (state, action) => {
      const { title, content, feature_image, category, tag, product } =
        action.payload;

      const parseContent = {
        title: title,
        content: JSON.parse(content),
        feature_image: feature_image,
        category: category ? category.map((i) => i.id) : [],
        tag: tag ? tag.map((i) => i.id) : [],
        product: product ? product.map((i) => i.id) : [],
      };

      state.currentBlog = parseContent;
    },
    setBlogmedia: (state, action) => {
      state.media = action.payload;
    },
    setBlogContent: (state, action) => {
      state.currentBlog.content = action.payload;
    },
    setBlogProduct: (state, action) => {
      state.currentBlog.product = action.payload;
    },
    setBlogCategory: (state, action) => {
      state.currentBlog.category = action.payload;
    },
    setBlogTag: (state, action) => {
      state.currentBlog.tag = action.payload;
    },
    setBlogTitle: (state, action) => {
      state.currentBlog.title = action.payload;
    },
    setBlogId: (state, action) => {
      state.blogId = action.payload;
    },
    setBlogPath: (state, action) => {
      state.blogPath = action.payload;
    },
    updateBlogDescription: (state, action) => {
      const { id, description } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.description = description;
      }
    },
    deleteBlog: (state, action) => {
      console.log(action.payload);
      blogAdapter.removeOne(state, action.payload);
    },
    updateBlog: (state, action) => {
      blogAdapter.updateOne(state, action);
    },
    updateCurrentBlog: (state, action) => {
      const changes = action.payload;
      Object.assign(state.currentBlog, changes);
    },
  },
});

export default blogSlice.reducer;

export const {
  setBlog,
  setCurrentBlog,
  setBlogCategory,
  setBlogTitle,
  setBlogTag,
  setBlogImage,
  clearBlogData,
  setBlogmedia,
  setBlogContent,
  setBlogId,
  setBlogPath,
  updateBlogDescription,
  updateBlog,
  updateCurrentBlog,
  deleteBlog,
  initBlog,
} = blogSlice.actions;

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
  selectTotal: selectNumberOfBlogs,
} = blogAdapter.getSelectors((state) => state.blog);

export const selectBlogs = createSelector(selectAllBlogs, (blogs) => {
  const cagorized = Object.keys(BLOG_STATUS).map((blogtype) => {
    return {
      [blogtype]: blogs.filter((item) => item.status === BLOG_STATUS[blogtype]),
    };
  });
  return cagorized;
});

export const selectPublishedBlogNamesAndIds = createSelector(
  selectAllBlogs,
  (blog) => {
    return blog
      .filter((b) => b.status == BLOG_STATUS.publish)
      .map((b) => ({ name: b.title, id: b.id }));
  }
);

export const selectEditingBlog = createSelector(
  [selectAllBlogs, (state, blogId) => blogId],
  (blogs, id) => blogs.find((blog) => blog.id == id)
);
