const { expect } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
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
    url: 'https://blogs.cs/3',
    likes: 4,
    __v: 0
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
})

test('four blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier is id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'yellow',
    author: 'mava',
    url: 'https://blogs.cs/4',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(b => b.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('yellow')
})

test('If not mentioned, default value of likes is zero', async () => {
  const newBlog = {
    title: 'yellow',
    author: 'mava',
    url: 'https://blogs.cs/4'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('If Title and URL are not mentioned, bad request', async () => {
  const newBlog = {
    author: 'mava',
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})