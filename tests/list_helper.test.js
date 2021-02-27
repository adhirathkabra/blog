const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listofBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'red',
    author: 'ava',
    url: 'https://blogs.cs/1',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f6',
    title: 'blue',
    author: 'java',
    url: 'https://blogs.cs/2',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'green',
    author: 'java',
    url: 'https://blogs.cs/2',
    likes: 4,
    __v: 0
  }
]

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listofBlogs)
    expect(result).toBe(18)
  })
})

describe('favorite blog', () => {

  test('among an empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })

  test('among a list of only one blog, is the blog itself', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('among a bigger list is returned correctly', () => {
    const result = listHelper.favoriteBlog(listofBlogs)
    expect(result).toEqual({
      title: 'red',
      author: 'ava',
      likes: 7
    })
  })
})

describe('author with most blogs', () => {

  test('among an empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })

  test('among a list of only one blog, is its author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('among a bigger list is returned correctly', () => {
    const result = listHelper.mostBlogs(listofBlogs)
    expect(result).toEqual({
      author: 'java',
      blogs: 2
    })
  })
})

describe('author with most likes', () => {

  test('among an empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })

  test('among a list of only one blog, is its author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('among a bigger list is returned correctly', () => {
    const result = listHelper.mostLikes(listofBlogs)
    expect(result).toEqual({
      author: 'ava',
      likes: 7
    })
  })
})