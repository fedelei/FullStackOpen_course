import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlog from './AddBlog'


test('renders blog', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
  }
  const { container } = render(<Blog blog={blog} handleLike={vi.fn()} removeBlog={vi.fn()} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Test Author')
})

test('clicking view button shows details', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.test.com',
    likes: 1,
  }

  render(<Blog blog={blog} handleLike={vi.fn()} removeBlog={vi.fn()} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect(screen.getByText('URL: www.test.com')).toBeDefined()
  expect(screen.getByText('Likes: 1')).toBeDefined()
})

test('clicking like button twice calls event handler twice', async () => {
    const blog = {
      id: '12345', // ID definido
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'www.test.com',
      likes: 1,
    }
    const handleLike = vi.fn()
  
    render(<Blog blog={blog} handleLike={handleLike} removeBlog={vi.fn()} />)
  
    const user = userEvent.setup()
  
    // Mostrar los detalles primero
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
  
    // Interactuar con el botón "Like"
    const likeButton = screen.getByText('Like')
    await user.dblClick(likeButton)
  
    //Verificar que `handleLike` fue llamado dos veces
    expect(handleLike).toHaveBeenCalledTimes(2)
    expect(handleLike).toHaveBeenCalledWith(blog.id)
  })

  test('calls createBlog with correct details when a new blog is added', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()
  
    render(<AddBlog createBlog={mockCreateBlog} />)
  
    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    const createButton = screen.getByRole('button', { name: /create/i })
  
    await user.type(titleInput, 'A New Blog')
    await user.type(authorInput, 'Author Name')
    await user.type(urlInput, 'https://example.com')
  
    await user.click(createButton)
  
    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'A New Blog',
      author: 'Author Name',
      url: 'https://example.com',
    })
  })