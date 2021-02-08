document.addEventListener("DOMContentLoaded", () => {

// access buttons and modal
const buttonOpen = document.getElementById("button-open")
const buttonClose = document.getElementById("button-close")
const modal = document.getElementById("modal-container-id")

// access form data
const contactForm = document.getElementById("contact-form")
const lastName = document.getElementById("lastname")
const firstName = document.getElementById("firstname")
const phoneNumber = document.getElementById("phone")
const emailAddress = document.getElementById("mail")
const messageText = document.getElementById("msg")

// reusable functions to check for valid values RegEx etc
const isRequired = value => value === '' ? false : true
const isBetween = (length, min, max) => length < min || length > max ? false : true

const isLastNameValid = (lastName) => {
  const re = /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/
  return re.test(lastName)
}
const isFirstNameValid = (firstName) => {
  const re = /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/
  return re.test(firstName)
}
const isPhoneValid = (phoneNumber) => {
  const re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
  return re.test(phoneNumber)
}
const isEmailValid = (emailAddress) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(emailAddress)
}
const isMessageValid = (messageText) => {
  const re = /[\w\d\s\.\'\,\-\!\@\#\$\&\*\`\~\[\]\?\<\>\"\:\;\\\/\{\}\|\%\^\(\)\+\=]{4,196}/
  return re.test(messageText)
}

// function to show error message
const showError = (input, message) => {
  const formField = input.parentElement

  formField.classList.remove("success")
  formField.classList.add("error")

  const error = formField.querySelector("small")

  error.textContent = message;
}

// function to remove error message (success) 
const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error")
  formField.classList.add("success")

  const error = formField.querySelector("small")
  error.textContent = ""
}

// functions to validate fileds
const checkLastName = () => {
  let valid = false
  const min = 2,
      max = 25
  const lastNameValue = lastName.value.trim()

  if (!isRequired(lastNameValue)) {
      showError(lastName, "Last name is required.")
  } else if (!isBetween(lastNameValue.length, min, max)) {
      showError(lastName, `Last name must be between ${min} and ${max} characters.`)
  } else if (!isLastNameValid(lastNameValue)) {
      showError(lastName, "Last name must not contain numbers or non-standard characters.")
  } else {
      showSuccess(lastName)
      valid = true
  }
  return valid
}

const checkFirstName = () => {
  let valid = false
  const min = 2,
      max = 25
  const firstNameValue = firstName.value.trim()

  if (!isRequired(firstNameValue)) {
      showError(firstName, "First name is required.")
  } else if (!isBetween(firstNameValue.length, min, max)) {
      showError(firstName, `First name must be between ${min} and ${max} characters.`)
  } else if (!isFirstNameValid(firstNameValue)) {
    showError(firstName, "First name imust not contain numbers or non-standard characters.")
  } else {
      showSuccess(firstName)
      valid = true
  }
  return valid
}

const checkPhoneNumber = () => {
  let valid = false
  const min = 8,
      max = 15
  const phoneNumberValue = phoneNumber.value.trim()

  if (!isRequired(phoneNumberValue)) {
    valid = true
  }else if (!isBetween(phoneNumberValue.length, min, max)) {
      showError(phoneNumber, `Phone number must be between ${min} and ${max} characters.`)
  } else if (!isPhoneValid(phoneNumberValue)) {
    showError(phoneNumber, "Phone number can only contain numbers and the + character, no spaces")
  } else {
      showSuccess(phoneNumber)
      valid = true
  }
  return valid
}

const checkEmail = () => {
  let valid = false
  const emailAddressValue = emailAddress.value.trim()

  if (!isRequired(emailAddressValue)) {
      showError(emailAddress, "Email is required.")
  } else if (!isEmailValid(emailAddressValue)) {
      showError(emailAddress, "A valid email address is required.")
  } else {
      showSuccess(emailAddress);
      valid = true
  }
  return valid
}

const checkMessage = () => {
  let valid = false
  const min = 4,
      max = 196
  const messageTextValue = messageText.value.trim()

  if (!isRequired(messageTextValue)) {
      showError(messageText, "Please write your message.")
  } else if (!isBetween(messageTextValue.length, min, max)) {
      showError(messageText, `Message must be between ${min} and ${max} characters.`)
  } else if (!isMessageValid(messageTextValue)) {
    showError(messageText, "Message is invalid.")
  } else {
      showSuccess(messageText)
      valid = true
  }
  return valid
}

// event listeners on each field to check live as input is entered
contactForm.addEventListener('input', function (e) {
  switch (e.target.id) {
      case 'lastname':
          checkLastName()
          break
      case 'firstname':
          checkFirstName()
          break
      case 'phone':
          checkPhoneNumber()
          break
      case 'mail':
          checkEmail()
          break
      case 'msg':
          checkMessage()
          break
  }
})

// validate input fields
buttonOpen.addEventListener('click', function (e) {
  // prevent the form from submitting
  e.preventDefault()
  // validate forms
  let isLastNameValid = checkLastName(),
      isFirstNameValid = checkFirstName(),
      isPhoneValid = checkPhoneNumber(),
      isEmailValid = checkEmail(),
      isMessageValid = checkMessage()

  let isFormValid = isLastNameValid &&
      isFirstNameValid &&
      isPhoneValid &&
      isEmailValid &&
      isMessageValid

// store values as variables to send to console (eventually it would be to a server)
  const lastNameReturn  = lastName.value.trim()
  const firstNameReturn  = firstName.value.trim()
  const phoneNumberReturn  = phoneNumber.value.trim()
  const emailAddressReturn  = emailAddress.value.trim()
  const messageTextReturn  = messageText.value.trim()

  // submit to the console/server if the form is valid
  if (isFormValid) {
    console.log("Valid form submitted")
    console.log(`Last name: ${lastNameReturn}`, `First name: ${firstNameReturn}`, `Phone: ${phoneNumberReturn}`, `Email: ${emailAddressReturn}`, `Message: ${messageTextReturn}`)
    modal.style.visibility = "visible"
  }
})

// close modal and reset form
buttonClose.onclick = () => {
  contactForm.reset()
  modal.style.visibility = "hidden"
}
})