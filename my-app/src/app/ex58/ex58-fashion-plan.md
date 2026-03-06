# ex58 Fashion Website - Implementation Plan

## Exercise Requirements

- Build a Fashion Website using MongoDB, NodeJS/ExpressJS (REST API), Angular (Admin & Client modules)
- Database: FashionData, Collection: Fashion
  - Fields: ObjectId, fashion_title, fashion_details, thumbnail, fashion_style, creation_date
  - Sample: 3 Styles, each with 3-5 fashions
- REST API (server-fashion, port 4000):
  - Get all Fashions (sorted by creation_date desc)
  - Filter Fashions by Style
  - Get Fashion by id
  - Add, Edit, Delete Fashion
- Admin module (Angular, port 4001):
  - List, View, Edit, Delete, Add Fashion (WYSIWYG editor for details)
- Client module (Angular, port 4002):
  - Display Fashions by Style, show details, search by Style

## Implementation Flow

### Step 1: Backend API (NodeJS/ExpressJS)

- [ ] Design Fashion schema for MongoDB
- [ ] Implement RESTful API endpoints
- [ ] Insert sample data (3 styles, 3-5 fashions each)
- [ ] Test API with Postman

### Step 2: API Testing

- [ ] Test each endpoint with Postman
- [ ] Fix errors if any

### Step 3: Angular Frontend

#### 3.1 Service & HTTP

- [ ] Create Angular service for API calls

#### 3.2 Components

- [ ] List, Detail, Edit, Delete, Add Fashion
- [ ] Integrate WYSIWYG editor for details
- [ ] Style grouping, search, routing

## File Structure

- Backend: my-server-mongodb/Index.js
- Admin: my-app/src/app/ex58/
- Client: (to be created)

## Notes

- Follow step-by-step: Backend → Postman → Angular
- Use this file to track progress and requirements.
