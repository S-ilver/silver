"use strict";

document.addEventListener('DOMContentLoaded',() => {
    const form = document.getElementById('form');
    form.addEventListener('submit',formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);
        if(error === 0){

        }else{
            alert('Заполните обезятелбное поле!!');
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for( let i = 0;i <formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
                }else if(input.getAttribute('type') === "checkbox" && input.checked === false){
                    formAddError(input);
                    error++;
                }else{
                    if(input.value === ''){
                        formAddError(input);
                        error++;
                    }
                }
            
        }
        return error;
    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    /* функция для проверки емайл */
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    /* просмотр фото и валидация */

    const formImage = document.getElementById('formImage');

    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });
    function uploadFile(file) {
        /*проверка на тип файла */
        if(!['image/jpeg','image/png','image/gif'].includes(file.type)){
            alert('Разрешено только фото');
            formImage.value = '';
            return;
        }
        /*проверка на размер файла */
        if(file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2мб');
            return;
        }
        /* выгрузка фото на превью */
        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt ="photo">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };

        reader.readAsDataURL(file);
    }


});