const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helpers');

describe('favorite blog', () => {
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
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://example.com',
        likes: 12,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d18fa',
        title: 'Yet another blog',
        author: 'Jane Smith',
        url: 'http://example2.com',
        likes: 8,
        __v: 0,
      },
    ];
  
    test('when list has only one blog, it is the favorite', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog);
      assert.deepStrictEqual(result, {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      });
    });
  
    test('when list has multiple blogs, return the one with most likes', () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs);
      assert.deepStrictEqual(result, {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      });
    });
  
    test('when list is empty, return null', () => {
      const result = listHelper.favoriteBlog([]);
      assert.strictEqual(result, null);
    });
  });
  