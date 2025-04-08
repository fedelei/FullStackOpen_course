const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helpers');

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another blog',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 3,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d18fa',
      title: 'Yet another blog',
      author: 'Jane Smith',
      url: 'http://example2.com',
      likes: 12,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totaLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('when list has multiple blogs, equals the sum of their likes', () => {
    const result = listHelper.totaLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 20);
  });

  test('when list is empty, equals zero', () => {
    const result = listHelper.totaLikes([]);
    assert.strictEqual(result, 0);
  });
});
