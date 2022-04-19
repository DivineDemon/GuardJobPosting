# Guard Job Listing App

## Database Entities

### Guard

- Guard Complete Data (from Guardman)

### Job

- Job Type
- Job Timing
- Job Location
- Job Description
- Job Payrate
- Job Level

### Security Company

- Name
- Phone
- Email
- Password

### Admin

- Email
- Username
- Phone
- Password

### Security Compliance Documents (from Guardman)

---

## Filtering/Search Data on GUI

- Distance (Explicit)
- Job Time (Explicit)
- State (Implicit)
- Pay Rate (Asc., Desc.) (Explicit)

---

# Users/Stakeholders:

- Guard
- Admin
- Security Firms

---

# FRs:

## Admin

- user role for verification of guards that sign-up on the app.
- approval of guards after sign-up.
- can view all the data present in the app.
- approval for job requests from the guards.

## Guard

- View all the jobs available for the area that he/she has the security compliance for.
- Upload his/her documents for verification.
- Use various filters to get the job most suitable for him.

## Company

- Create jobs for guards.
- Approve guards that voted for the job posted by the company.

---

# TO-DO

[] Create Server using Express
[] Connect to MongoDB using mongoose
[] Create Requisite Schema
[] Create CRUD Endpoints in the API