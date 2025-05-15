# Seating Section Management - Angular App

This project allows users to manage seating sections with full CRUD functionality, pagination, filtering, and responsive UI.

## Features

- **Add/Edit/Delete** Seating Sections
- **Form Validation**:
  - Section Name: No numbers allowed
  - Discount %: Only numbers allowed
  - Discount End Date: Required
- **Datetime Format**: Displayed in `yyyy-MM-dd HH:mm` format
- **Toast Notifications** for success/error messages
- **Search/Filter**: Supports filtering by all fields (Section Name, Disc %, End Date, Incentive)
- **Pagination**: Works with filtered results
- **Icons**: Action icons for edit, delete, and navigation

## Technologies

- Angular
- Bootstrap
- ngx-toastr

## Setup

```bash
npm install
ng serve
