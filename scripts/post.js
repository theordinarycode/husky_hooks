const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { spawn } = require("child_process");

let existingPosts = [];

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createPost = () => {
  existingPosts = getExistingPosts();
  getPostName();
};

createPost();

function getExistingPosts() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const existingPosts = fileNames.map((fn) => {
    const id = fn.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fn);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const dateSplit = matterResult.data.date.toString().slice(0, 15).split(" ");
    const formattedDate = `${dateSplit[1]} ${dateSplit[2]}, ${dateSplit[3]}`;
    return {
      slug: id.split(".")[0],
      id: matterResult.data.id,
    };
  });

  ///

  return existingPosts;
}

function getPostName() {
  let postName = "";
  readline.question(`Please enter a new post name: `, (pn) => {
    postName = pn;
    const slug = createSlugFromPostName(postName);
    const slugExists = findMatchingSlugFromExistingFiles(slug);
    const data = { slug, postName };
    //console.log("slug exists?", findMatchingSlugFromExistingFiles(slug));
    if (slugExists) {
      console.log("This post name already exists.");
      getPostName();
    } else {
      writePost(postName, slug);
      readline.close();
    }
  });
}

function createSlugFromPostName(postName) {
  const slug = postName.toLowerCase().split(" ").join("-");
  return slug;
}

function findMatchingSlugFromExistingFiles(slug) {
  const existingSlugs = existingPosts.map((post) => {
    return post.slug === slug;
  });
  if (existingSlugs.includes(true)) {
    return true;
  } else {
    return false;
  }
  //console.log(existingSlugs);
}

function writePost(postName, slug) {
  console.log(`Writing: ${postName}, with the slug of: ${slug}`);

  ///

  createPost(postName, slug, existingPosts);

  function createPost(fileName, slug, posts) {
    const maxValue = Math.max(...posts.map((post) => post.id));
    console.log("last post id", maxValue);
    const newPostId = parseInt(maxValue) + 1;
    console.log("next post id", newPostId);

    const postData = `---
id: ${newPostId}
title: ${fileName}
tags:
 - null
date: ${new Date().toISOString().replace(/T.*/, "").split("-").join("-")}
excerpt: Add excerpt here.
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

`;

    try {
      fs.readdirSync("posts");
    } catch (e) {
      console.log("Theres no posts directory");
    }

    fs.writeFile(`posts/${slug}.mdx`, postData, function (err) {
      if (err) return console.log(err);
      console.log(`file: ${slug}.mdx created!`);
      openPost(slug);
    });
  }

  ///
}

const openPost = (slug) => {
  const postToOpen = `posts/${slug}.mdx`;
  console.log(postToOpen);
  const code = spawn("code", [postToOpen]);
  code.postToOpen;
};
