const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const arrayLikes = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return arrayLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const arrayLikes = blogs.map(blog => blog.likes)
  const i = arrayLikes.indexOf(Math.max(...arrayLikes))
  const favBlog = blogs[i]
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const arrayAuthors = blogs.map(blog => blog.author)
  const sortAuthor = (array) => {
    return array.sort((a,b) => {
      array.filter(v => v===a).length - array.filter(v => v===b).length
    })
  }
  const modeAuthor = sortAuthor(arrayAuthors).pop()
  const blogsOfmodeAuthor = blogs.filter(blog => blog.author === modeAuthor)
  return {
    author: modeAuthor,
    blogs: blogsOfmodeAuthor.length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const arrayAuthors = blogs.map(blog => blog.author)
  const uniqueAuthors = (array) => {
    return array.filter((name,i) => array.indexOf(name) === i)
  }
  const arrayUniqueAuthors = uniqueAuthors(arrayAuthors)
  const likeCount = []
  arrayUniqueAuthors.forEach(author => {
    const blogsOfThisAuthor = blogs.filter(blog => blog.author === author)
    const likesOfTheseBlogs = blogsOfThisAuthor.map(blog => blog.likes)
    const sumOfLikes = likesOfTheseBlogs.reduce((a, b) => a + b, 0)
    likeCount.push(sumOfLikes)
  })
  const maxLikesIndex =  likeCount.indexOf(Math.max(...likeCount))
  return {
    author: arrayUniqueAuthors[maxLikesIndex],
    likes: likeCount[maxLikesIndex]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}