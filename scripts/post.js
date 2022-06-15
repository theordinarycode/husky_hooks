const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

createPost();

function createPost() {
  console.log("creating post");
}

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const getFileName = (posts) => {
//   let fileName = "";
//   const slug = fileName.toLowerCase().split(" ").join("-");
//   readline.question(`Please enter a new file name: `, (fn) => {
//     fileName = fn;
//     const duplicates = findDuplicateSlug(fileName, posts);
//     if (duplicates.length > 0) {
//       console.log(`A post called ${fn} already exists!`);
//       getFileName(posts);
//     } else {
//       createPost(fileName, slug, posts);
//       readline.close();
//     }
//   });
//   return slug;
// };

// function getData() {
//   const postsDirectory = path.join(process.cwd(), "posts");
//   const fileNames = fs.readdirSync(postsDirectory);
//   //   console.log(fileNames);
//   const posts = fileNames.map((fn) => {
//     const id = fn.replace(/\.md$/, "");
//     const fullPath = path.join(postsDirectory, fn);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const matterResult = matter(fileContents);

//     const dateSplit = matterResult.data.date.toString().slice(0, 15).split(" ");
//     const formattedDate = `${dateSplit[1]} ${dateSplit[2]}, ${dateSplit[3]}`;

//     return {
//       slug: id.split(".")[0],
//       id: matterResult.data.id,
//       //title: matterResult.data.title,
//       //excerpt: matterResult.data.excerpt,
//       //tags: matterResult.data.tags,
//       //date: formattedDate,
//     };
//   });
//   return posts;
// }

// const findDuplicateSlug = (fileName, posts) => {
//   //console.log(fileName);

//   const results = posts.filter(function (entry) {
//     return entry.slug === fileName;
//   });
//   return results;
// };

// function createPost(fileName, slug, posts) {
//   const maxValue = Math.max(...posts.map((post) => post.id));
//   console.log("last post id", maxValue);
//   const newPostId = parseInt(maxValue) + 1;
//   console.log("next post id", newPostId);

//   const postData = `---
// id: ${newPostId}
// title: ${fileName}
// tags:
//   - none
// date: ${new Date().toISOString().replace(/T.*/, "").split("-").join("-")}
// excerpt: Add excerpt here.
// ---

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

// `;

//   //console.log(postData);

//   try {
//     fs.readdirSync("posts");
//   } catch (e) {
//     console.log("Theres no posts directory");
//   }

//   fs.writeFile(`posts/${slug}.mdx`, postData, function (err) {
//     if (err) return console.log(err);
//     console.log(`file: ${slug}.mdx created!`);
//   });
// }

// const openPost = () => {
//   console.log("open post");
// };

// const initPost = () => {
//   const posts = getData();
//   getFileName(posts);
//   openPost();
// };

// initPost();
