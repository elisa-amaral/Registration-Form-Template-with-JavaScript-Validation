class RegistrationForm {
    constructor() {
        this.registrationForm = document.querySelector('.registrationForm')
        this.events()
    }

    events() {
        this.registrationForm.addEventListener('submit', e => {
            this.handleSubmit(e)
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        const passwordsAreValid = this.validatePassword()
        const fieldsAreValid = this.validateFields()

        if (fieldsAreValid && passwordsAreValid) {
            alert(`This is when the form would be sent to the backend!`)
        }
    }
    
    validateUsername(field) {
        const username = field.value
        let usernameIsValid = true
        if (username.length < 3 || username.length > 12) {
            this.setError(field, 'Username must contain between 3 and 12 characters.')
            usernameIsValid = false
        }

        if (!username.match(/^[a-zA-Z0-9]+$/g)) {
            this.setError(field, 'Username must contain only enter letters and/or numbers.')
            usernameIsValid = false
        }

        return usernameIsValid
    }

    validatePassword() {
        let passwordsAreValid = true 
        
        const newPassword = this.registrationForm.querySelector('.newPassword')
        const repeatNewPassword = this.registrationForm.querySelector('.repeatNewPassword')

        if (newPassword.value != repeatNewPassword.value) {
            this.setError(newPassword, `New Password" and "Repeat New Password" must be equal.`)
            this.setError(repeatNewPassword, `"New Password" and "Repeat New Password" must be equal.`)
            passwordsAreValid = false
        }

        if (newPassword.value.length < 6 || newPassword.value.length > 12) {
            this.setError(newPassword, `Password must contain between 6 and 12 characters.`)
            passwordsAreValid = false
        }

        return passwordsAreValid
    }

    validateFields() {
        let fieldsAreValid = true 
        
        for (let errorMessage of this.registrationForm.querySelectorAll('.errorMessage')) {
            errorMessage.remove()
        }

        for (let field of this.registrationForm.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerHTML
            if (!field.value) {
                this.setError(field, `"${label}" field cannot be empty.`)
                fieldsAreValid = false
            }

            if (field.classList.contains('username')) {
                if (!this.validateUsername(field)) fieldsAreValid = false
            }
        }

        return fieldsAreValid
    }

    setError(field, errorMessage) {
        const div = document.createElement('div')
        div.classList.add('errorMessage')
        div.innerHTML = errorMessage
        field.insertAdjacentElement('afterend', div)
    }
}

const registrationForm = new RegistrationForm()