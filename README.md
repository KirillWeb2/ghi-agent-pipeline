# React Posts App

A modern React application for managing blog posts with client-side routing using React Router DOM.

## Features

- **Client-side routing** with React Router v6
- **Post management**: Create, view, and delete posts
- **Persistent storage**: Posts are saved to browser localStorage
- **Search and filter**: Find posts by title or body text
- **Sorting**: Sort posts by creation date (newest/oldest)
- **Input validation**: Extended validation for post title and body
- **Error boundary**: Comprehensive error handling
- **Responsive design**: Works great on desktop and mobile devices
- **Edit history**: Track post creation and update timestamps

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx      # Error boundary for error handling
│   ├── Layout.jsx              # Main layout with navigation
│   ├── Layout.css
│   ├── PostForm.jsx            # Reusable form component
│   ├── PostForm.css
│   ├── PostItem.jsx            # Post card component
│   └── PostItem.css
├── pages/
│   ├── PostsList.jsx           # Posts listing page
│   ├── PostsList.css
│   ├── CreatePost.jsx          # Post creation page
│   └── CreatePost.css
├── App.jsx                     # Main app with routing
├── App.css
├── main.jsx                    # Entry point with BrowserRouter
└── index.css                   # Global styles
```

## Routes

- `/` - Redirects to `/posts`
- `/posts` - List all posts
- `/posts/new` - Create a new post
- `*` - Redirects to `/posts` (catch-all)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will open at `http://localhost:5173` (default Vite port).

### Build

```bash
# Create production build
npm run build
```

### Preview

```bash
# Preview production build locally
npm run preview
```

## Usage

### Creating a Post

1. Click "New Post" in the navigation or on the posts list page
2. Fill in the post title (required, max 100 characters)
3. Fill in the post body (required, max 5000 characters)
4. Click "Create Post"
5. You'll be redirected to the posts list and see your new post

### Viewing Posts

1. Click "Posts" in the navigation
2. Posts are sorted by creation date (newest first by default)
3. Use the search box to filter posts by title or body text
4. Click "Sort" button to change sort order

### Deleting a Post

1. Find the post you want to delete
2. Click the "×" button in the top-right corner of the post
3. Confirm the deletion in the popup dialog

## Data Persistence

All posts are automatically saved to browser localStorage. They will persist between browser sessions until cleared.

## Validation Rules

### Post Title
- **Required**: Must not be empty
- **Max length**: 100 characters
- **Sanitization**: Angle brackets (`<`, `>`) are removed

### Post Body
- **Required**: Must not be empty
- **Max length**: 5000 characters
- **Sanitization**: Angle brackets (`<`, `>`) are removed

## Error Handling

The application includes:

- **Error Boundary**: Catches and displays React rendering errors
- **Form Validation**: Client-side validation with user-friendly error messages
- **Loading States**: Visual feedback during async operations
- **Try-catch Blocks**: Safe error handling in critical functions

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Requires ES6+ support and localStorage API

## Technologies Used

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Vite** 5.0.8
- **CSS3** with modern features (Grid, Flexbox)

## Performance

- Lazy component rendering
- Memoized search filtering
- Efficient state management
- CSS animations for smooth transitions
- Responsive images and optimized assets

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management
- Color contrast compliance

## Future Enhancements

- Post editing functionality
- Tags/categories system
- Comment system
- User authentication
- Backend API integration
- Post images/attachments
- Dark mode theme
- Export posts as JSON/PDF

## License

MIT
