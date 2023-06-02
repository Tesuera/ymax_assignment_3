
        // error_status
        var error_status = 0;

        // form submit
        $('#signin_form').submit((e) => {
            e.preventDefault();
            formData = new FormData(e.target);

            error_status = 0;
            $('#error_name').text("");
            $('#error_email').text("");
            $('#error_password').text("");
            $('#error_phone').text("");


            validateName(formData.get('name'));
            validateEmail(formData.get('email'));
            validatePassword(formData.get('password'));
            validatePhone(formData.get('phone_number'));

            if(!error_status) {
                const tempUser = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    phone_number: formData.get('phone_number')
                }

                sessionStorage.setItem('tempUser', JSON.stringify(tempUser));
                location.href = "items-list.html";
            }
        })