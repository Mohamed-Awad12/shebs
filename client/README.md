# Day5 Client (React + Vite)

A lightweight frontend for the Day5 backend API (auth, books, borrow, admin approval).

## Features
- User authentication (register & login)
- Single (pre-seeded) admin moderates books (not created via UI)
- Users submit books -> start pending (not published) until admin approves
- Admin approval / rejection (approve sets published+approved, reject unpublishes)
- View approved books & borrow with a due date (users only)
- View borrowed books history (users only)
- View own authored books
- Basic profile view

## Tech Stack
- React 18 + Vite
- React Router v6
- Axios

## Setup
```bash
npm install
npm run dev
```
Backend default base URL: `http://localhost:3000` (configure via `VITE_API_BASE_URL`).

Create a `.env` file:
```
VITE_API_BASE_URL=http://localhost:3000
```

## Folder Structure
```
client/
  src/
    components/   # UI components & views
    state/        # Auth context
    utils/        # Axios instance
```

## Notes
- Registration always creates normal users. Admin account must be created directly in the database (collection `admins`). Keep only one admin.
- JWT payload is decoded client-side for role display only (no secret usage).
- Routes `/publish`, `/my-books`, `/borrowed` are restricted to `user` role.
- Admin cannot borrow books; borrow endpoints reject admins.
- Admin panel now uses `/admin/books` to see every book (pending & approved).

## Future Improvements
- Better error handling & form validation
- Loading skeletons
- Pagination for books
- Global toast notifications
- Dark mode

MIT License
