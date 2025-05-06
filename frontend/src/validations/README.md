# Frontend Validations Documentation

## 1. Login/Signup Validations (`Login.jsx`)
- Password validation:
  - Minimum 8 characters
  - Must contain at least one uppercase letter
  - Must contain at least one lowercase letter
  - Must contain at least one number
  - Must contain at least one special character
- Email validation for admin accounts
- Required fields validation for name, email, and password

## 2. Card Payment Validations (`CardPaymentPage.jsx`)
- Card Holder Name: Required field
- Card Number: Required field
- Expiry Date:
  - Required field
  - Format validation (MM/YY)
  - Future date validation
  - Minimum year validation (2025)
- CVV: Required field

## 3. Patient Details Validations (`PatientDetailsForm.jsx`)
- Email format validation (regex: /\S+@\S+\.\S+/)
- Phone number validation (10 digits)
- Address validation (non-empty)
- Name validation (letters and spaces only)
- Required fields validation for all inputs

## 4. Supplier Form Validations (`SupplierForm.jsx`)
- Required fields validation (name, email, item, phoneNumber)
- Email format validation
- Phone number validation (10 digits, no spaces or dashes)

## 5. Product Management Validations
### Add Glass (`AddGlass.jsx`)
- Title validation:
  - Required field
  - Minimum 3 characters
- Description validation:
  - Required field
  - Minimum 5 characters
- Price validation:
  - Required field
  - Minimum value of 0
- Category selection validation

### Update Glass (`UpdateGlass.jsx`)
- Price validation:
  - Required field
  - Minimum value of 0
  - Maximum value of 1,000,000
- Stock validation:
  - Required field
  - Non-negative number
  - Maximum realistic value

## 6. Appointment Booking Validations (`Appointment.jsx`)
- Required fields validation for:
  - Full Name
  - Phone Number
  - Address
  - Payment Method

## 7. Checkout Page Validations (`CheckoutPage.jsx`)
- Required fields validation for:
  - Full Name
  - Email
  - Phone Number

## 8. Doctor Management Validations (`AddDoctor.jsx`)
- Required fields validation for:
  - Fee
  - Image URL
  - Description

## 9. Reset Password Validations (`ResetPassword.jsx`)
- OTP validation:
  - 6-digit code
  - Required field
  - Input length validation 