// Смена пароля (демо-логика). Логика идемпотентна: повторная инициализация не добавляет дубли обработчиков.

(function () {
  function initChangePassword() {
    const modal = document.getElementById('changePasswordModal');
    const openBtn = document.getElementById('changePasswordBtn');
    const closeBtn = document.querySelector('#changePasswordModal .close');
    const cancelBtn = document.getElementById('cancelChangePassword');
    const confirmBtn = document.getElementById('confirmChangePassword');

    // Если на странице нет модалки/кнопки подтверждения — просто выходим.
    if (!modal || !confirmBtn) return;

    // Не вешаем обработчики второй раз.
    if (modal.dataset.passwordInit === '1') return;
    modal.dataset.passwordInit = '1';

    const currentPassEl = document.getElementById('currentPassword');
    const newPassEl = document.getElementById('newPassword');
    const confirmPassEl = document.getElementById('confirmNewPassword');
    const errorDiv = document.getElementById('passwordError');

    const clearFields = () => {
      if (currentPassEl) currentPassEl.value = '';
      if (newPassEl) newPassEl.value = '';
      if (confirmPassEl) confirmPassEl.value = '';
      if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.innerHTML = '';
        errorDiv.className = 'password-error';
      }

      // Сброс подсветки
      if (confirmPassEl) {
        confirmPassEl.style.borderColor = '';
        confirmPassEl.style.boxShadow = '';
      }
    };

    const openModal = () => {
      modal.style.display = 'flex';
      clearFields();
    };

    const closeModal = () => {
      modal.style.display = 'none';
      clearFields();
    };

    const showErrors = (errors) => {
      if (!errorDiv) return;
      errorDiv.innerHTML = errors
        .map((e) => `<div><i class="fas fa-exclamation-circle"></i> ${e}</div>`)
        .join('');
      errorDiv.style.display = 'block';
      errorDiv.className = 'password-error error';
    };

    const showSuccess = (msg) => {
      if (!errorDiv) return;
      errorDiv.innerHTML = `<div><i class="fas fa-check-circle"></i> ${msg}</div>`;
      errorDiv.style.display = 'block';
      errorDiv.className = 'password-error success';
    };

    // Открытие (если есть отдельная кнопка)
    if (openBtn) openBtn.addEventListener('click', openModal);

    // Закрытие
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне окна
    window.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });

    // Подсветка совпадения паролей
    const checkPasswordsMatch = () => {
      if (!newPassEl || !confirmPassEl) return;
      const newPass = newPassEl.value || '';
      const confirmPass = confirmPassEl.value || '';

      if (newPass && confirmPass && newPass !== confirmPass) {
        confirmPassEl.style.borderColor = '#e74c3c';
        confirmPassEl.style.boxShadow = '0 0 0 0.2rem rgba(231, 76, 60, 0.25)';
      } else if (newPass && confirmPass && newPass === confirmPass) {
        confirmPassEl.style.borderColor = '#2ecc71';
        confirmPassEl.style.boxShadow = '0 0 0 0.2rem rgba(46, 204, 113, 0.25)';
      } else {
        confirmPassEl.style.borderColor = '';
        confirmPassEl.style.boxShadow = '';
      }
    };

    if (newPassEl) newPassEl.addEventListener('input', checkPasswordsMatch);
    if (confirmPassEl) confirmPassEl.addEventListener('input', checkPasswordsMatch);

    // Подтверждение
    confirmBtn.addEventListener('click', async () => {
      const currentPassword = currentPassEl?.value || '';
      const newPassword = newPassEl?.value || '';
      const confirmPassword = confirmPassEl?.value || '';

      const errors = [];
      if (!currentPassword) errors.push('Введите текущий пароль');
      if (!newPassword) errors.push('Введите новый пароль');
      if (!confirmPassword) errors.push('Подтвердите новый пароль');

      if (newPassword && newPassword.length < 6) {
        errors.push('Новый пароль должен быть не менее 6 символов');
      }

      if (newPassword && currentPassword && newPassword === currentPassword) {
        errors.push('Новый пароль не должен совпадать с текущим');
      }

      if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        errors.push('Новые пароли не совпадают');
      }

      if (errors.length) {
        showErrors(errors);
        return;
      }

      try {
        await DataManager.changePassword(currentPassword, newPassword);
        showSuccess('Пароль успешно изменён!');
        setTimeout(closeModal, 1200);
      } catch (e) {
        showErrors([e.message || 'Не удалось изменить пароль']);
      }
    });
  }

  window.initChangePassword = initChangePassword;
})();
