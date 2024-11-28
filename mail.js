// mail.js

document.addEventListener('DOMContentLoaded', function() {
  const emailList = document.getElementById('email-list');
  const loadingSpinner = document.getElementById('loading-spinner');
  const settingsForm = document.getElementById('settings-form');
  const settingsModal = document.getElementById('settings-modal');
  const openSettingsModalButton = document.getElementById('open-settings-modal');
  const closeModalButton = document.querySelector('.close');
  const addEmailSettingsButton = document.getElementById('add-email-settings');
  const emailSettingsContainer = document.getElementById('email-settings-container');

  let emailSettings = [];

  // Function to fetch emails
  function fetchEmails() {
    loadingSpinner.style.display = 'block';
    emailList.innerHTML = '';

    // Simulate an API call to fetch emails
    setTimeout(() => {
      loadingSpinner.style.display = 'none';
      const emails = emailSettings.flatMap(settings => [
        { subject: `Email 1 from ${settings.emailAddress}`, sender: settings.emailAddress, message: 'Message 1' },
        { subject: `Email 2 from ${settings.emailAddress}`, sender: settings.emailAddress, message: 'Message 2' },
        { subject: `Email 3 from ${settings.emailAddress}`, sender: settings.emailAddress, message: 'Message 3' },
      ]);

      emails.forEach(email => {
        const li = document.createElement('li');
        li.textContent = `${email.subject} - ${email.sender}`;
        emailList.appendChild(li);
      });
    }, 2000);
  }

  // Fetch emails on page load
  fetchEmails();

  // Handle settings form submission
  settingsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    emailSettings = Array.from(document.querySelectorAll('.email-settings')).map(settings => ({
      emailProvider: settings.querySelector('[name="email-provider"]').value,
      emailAddress: settings.querySelector('[name="email-address"]').value,
      emailPassword: settings.querySelector('[name="email-password"]').value,
      popServer: settings.querySelector('[name="pop-server"]').value,
      smtpServer: settings.querySelector('[name="smtp-server"]').value,
      imapServer: settings.querySelector('[name="imap-server"]').value,
    }));

    // Save settings (this is just a simulation)
    console.log('Settings saved:', emailSettings);

    // Fetch emails again with new settings
    fetchEmails();

    // Close the modal
    settingsModal.style.display = 'none';
  });

  // Open the modal
  openSettingsModalButton.addEventListener('click', function() {
    settingsModal.style.display = 'block';
  });

  // Close the modal
  closeModalButton.addEventListener('click', function() {
    settingsModal.style.display = 'none';
  });

  // Close the modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target == settingsModal) {
      settingsModal.style.display = 'none';
    }
  });

  // Add another email settings section
  addEmailSettingsButton.addEventListener('click', function() {
    const newEmailSettings = document.createElement('div');
    newEmailSettings.classList.add('email-settings');
    newEmailSettings.innerHTML = `
      <label for="email-provider">Fournisseur de messagerie :</label>
      <input type="text" name="email-provider" required>
      <label for="email-address">Adresse email :</label>
      <input type="email" name="email-address" required>
      <label for="email-password">Mot de passe :</label>
      <input type="password" name="email-password" required>
      <label for="pop-server">Serveur POP :</label>
      <input type="text" name="pop-server" required>
      <label for="smtp-server">Serveur SMTP :</label>
      <input type="text" name="smtp-server" required>
      <label for="imap-server">Serveur IMAP :</label>
      <input type="text" name="imap-server" required>
    `;
    emailSettingsContainer.appendChild(newEmailSettings);
  });
});