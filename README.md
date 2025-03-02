# RadixILS Frontend Interview Project

This project is designed for conducting frontend interviews with candidates for RadixILS, a reinsurance company looking for engineers to build analytics UIs.

## Project Overview

The project is a Next.js application that simulates a reinsurance analytics platform. It includes:

- Mock data for policies, insurance companies, claims, and analytics metrics
- A sample analytics dashboard showcasing data visualization
- API endpoints that mimic a real backend service
- A set of interview tasks to assess candidate skills

## Interview Tasks

The project contains three interview tasks of varying difficulty levels:

1. **Data Fetching and Display**: Candidates fetch policy data from the API and display it in a table with pagination.
2. **State Management and Form Creation**: Candidates create a form with validation to add new insurance companies.
3. **Data Visualization Enhancement**: Candidates add interactive charts to the analytics dashboard.

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Clone the repository:
```bash
git clone [repo-url]
cd radixils-interview
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Conducting the Interview

### Setup (Before the Interview)

1. Ensure the project runs correctly on your machine
2. Consider sharing the project with the candidate in advance

### During the Interview

1. Introduce the candidate to the project (5 minutes)
2. Explain that they can navigate to `/tasks` to see the available interview tasks
3. Let the candidate choose one or more tasks based on their experience level
4. Observe how they approach the problem and their development process
5. Take notes on:
   - Code organization and structure
   - React and Next.js knowledge
   - Problem-solving approach
   - Communication skills

### Assessment Criteria

For each task, evaluate:

- **Code Quality**: Clean, readable, and maintainable code
- **Component Structure**: Logical component hierarchy and reusability
- **State Management**: Appropriate use of React state and context
- **React Patterns**: Familiarity with modern React patterns and hooks
- **Next.js Features**: Utilization of Next.js routing, API routes, etc.
- **Error Handling**: Proper handling of edge cases and errors
- **Performance Considerations**: Optimization techniques and awareness

## Project Structure

```
/app
  /analytics - Analytics dashboard page
  /api - API routes for mock data
  /tasks - Interview tasks listing
/components
  /data-cards - Reusable UI components for data display
/lib
  /data.ts - Mock data generation with FakerJS
```

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- FakerJS for mock data generation

## License

This project is for internal interview purposes only.

## Author

RadixILS Engineering Team
