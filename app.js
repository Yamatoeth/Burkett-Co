// Client management functionality with enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    // Sample client data
    let clients = [
        {
            id: 1,
            name: 'Sarah Williams',
            company: 'Tech Solutions Inc.',
            email: 'sarah@techsolutions.com',
            phone: '+1 (555) 123-4567'
        },
        {
            id: 2,
            name: 'David Chen',
            company: 'Green Energy Co.',
            email: 'david@greenenergy.com',
            phone: '+1 (555) 234-5678'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            company: 'Creative Agency',
            email: 'emily@creativeagency.com',
            phone: '+1 (555) 345-6789'
        }
    ];

    let selectedClientId = null;

    // DOM elements
    const clientList = document.getElementById('clientList');
    const clientPanel = document.getElementById('clientPanel');
    const emptyState = document.getElementById('emptyState');
    const clientDetails = document.getElementById('clientDetails');
    const searchInput = document.getElementById('search');
    const addClientBtn = document.getElementById('addClientBtn');
    const modal = document.getElementById('modal');
    const clientForm = document.getElementById('clientForm');
    const cancelModal = document.getElementById('cancelModal');
    const contactForm = document.getElementById('contactForm');
    const demoBtn = document.getElementById('demoBtn');
    const yearSpan = document.getElementById('year');

    // Initialize toast container
    initializeToastContainer();

    // Set current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Toast notification system
    function initializeToastContainer() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }

    function showToast(title, message, type = 'info', duration = 4000) {
        const container = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">×</button>
        `;

        container.appendChild(toast);

        // Auto remove
        const timeout = setTimeout(() => removeToast(toast), duration);

        // Manual close
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeout);
            removeToast(toast);
        });

        return toast;
    }

    function removeToast(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Loading state management
    function setButtonLoading(button, loading = true) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    function setElementLoading(element, loading = true) {
        if (loading) {
            element.classList.add('loading');
            if (!element.querySelector('.loading-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'loading-overlay';
                overlay.innerHTML = '<div class="spinner"></div>';
                element.style.position = 'relative';
                element.appendChild(overlay);
            }
        } else {
            element.classList.remove('loading');
            const overlay = element.querySelector('.loading-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    }

    // Enhanced client rendering with loading states
    function renderClients(clientsToRender = clients, showLoading = false) {
        if (!clientList) return;
        
        if (showLoading) {
            setElementLoading(clientList, true);
            // Simulate API delay
            setTimeout(() => {
                setElementLoading(clientList, false);
                actuallyRenderClients(clientsToRender);
            }, 800);
        } else {
            actuallyRenderClients(clientsToRender);
        }
    }

    function actuallyRenderClients(clientsToRender) {
        clientList.innerHTML = '';
        clientsToRender.forEach(client => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${client.name}</strong>
                    <br>
                    <small>${client.company}</small>
                </div>
                <button class="btn-outline" onclick="deleteClient(${client.id})" title="Delete client">×</button>
            `;
            
            if (selectedClientId === client.id) {
                li.classList.add('selected');
            }
            
            li.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    selectClient(client);
                }
            });
            clientList.appendChild(li);
        });
    }

    // Enhanced client selection
    function selectClient(client) {
        selectedClientId = client.id;
        
        // Update UI to show selected state
        document.querySelectorAll('.client-list li').forEach(li => {
            li.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');
        
        showClientDetails(client);
    }

    // Show client details with animation
    function showClientDetails(client, showLoading = false) {
        if (!clientDetails || !emptyState) return;
        
        if (showLoading) {
            setElementLoading(clientPanel, true);
            setTimeout(() => {
                setElementLoading(clientPanel, false);
                actuallyShowClientDetails(client);
            }, 500);
        } else {
            actuallyShowClientDetails(client);
        }
    }

    function actuallyShowClientDetails(client) {
        emptyState.style.display = 'none';
        clientDetails.style.display = 'block';
        clientDetails.innerHTML = `
            <h4>${client.name}</h4>
            <p><strong>Company:</strong> ${client.company}</p>
            <p><strong>Email:</strong> <a href="mailto:${client.email}">${client.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${client.phone}">${client.phone}</a></p>
            <div style="margin-top: 20px;">
                <button class="btn-primary" onclick="editClient(${client.id})">Edit Client</button>
                <button class="btn-outline" onclick="deleteClient(${client.id})" style="margin-left: 8px;">Delete Client</button>
            </div>
        `;
    }

    // Enhanced search with debouncing
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = this.value.toLowerCase();
            
            searchTimeout = setTimeout(() => {
                if (searchTerm.length > 0) {
                    setElementLoading(clientList, true);
                    setTimeout(() => {
                        const filteredClients = clients.filter(client => 
                            client.name.toLowerCase().includes(searchTerm) ||
                            client.company.toLowerCase().includes(searchTerm) ||
                            client.email.toLowerCase().includes(searchTerm)
                        );
                        setElementLoading(clientList, false);
                        actuallyRenderClients(filteredClients);
                        
                        if (filteredClients.length === 0) {
                            showToast('No results', `No clients found for "${this.value}"`, 'info', 2000);
                        }
                    }, 300);
                } else {
                    actuallyRenderClients(clients);
                }
            }, 300);
        });
    }

    // Add client modal
    if (addClientBtn) {
        addClientBtn.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('hidden');
                // Focus first input
                const firstInput = modal.querySelector('input[name="name"]');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 100);
                }
            }
        });
    }

    // Cancel modal
    if (cancelModal) {
        cancelModal.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Enhanced modal closing
    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
            if (clientForm) clientForm.reset();
            clearFormValidation();
        }
    }

    // Form validation
    function validateForm(form) {
        const fields = form.querySelectorAll('input[required]');
        let isValid = true;

        fields.forEach(field => {
            const value = field.value.trim();
            const fieldContainer = field.closest('.form-field') || field.parentNode;
            
            // Remove existing validation classes
            fieldContainer.classList.remove('error', 'success');
            
            if (!value) {
                fieldContainer.classList.add('error');
                isValid = false;
                showFieldError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(value)) {
                fieldContainer.classList.add('error');
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            } else {
                fieldContainer.classList.add('success');
                hideFieldError(field);
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function hideFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    function clearFormValidation() {
        document.querySelectorAll('.form-field').forEach(field => {
            field.classList.remove('error', 'success');
        });
        document.querySelectorAll('.field-error').forEach(error => {
            error.textContent = '';
        });
    }

    // Enhanced client form submission
    if (clientForm) {
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showToast('Validation Error', 'Please correct the errors below', 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            setButtonLoading(submitBtn, true);

            // Simulate API call
            setTimeout(() => {
                const formData = new FormData(this);
                const newClient = {
                    id: Date.now(),
                    name: formData.get('name'),
                    company: formData.get('company') || 'No company',
                    email: formData.get('email'),
                    phone: formData.get('phone') || 'No phone'
                };
                
                clients.push(newClient);
                renderClients();
                closeModal();
                setButtonLoading(submitBtn, false);
                
                showToast('Success!', `Client ${newClient.name} has been added successfully`, 'success');
                
                // Auto-select the new client
                setTimeout(() => {
                    selectedClientId = newClient.id;
                    renderClients();
                    showClientDetails(newClient);
                }, 100);
            }, 1000);
        });
    }

    // Enhanced contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showToast('Validation Error', 'Please fill in all required fields correctly', 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            setButtonLoading(submitBtn, true);

            // Simulate form submission
            setTimeout(() => {
                setButtonLoading(submitBtn, false);
                this.reset();
                clearFormValidation();
                showToast('Message Sent!', 'Thank you for your message. We will get back to you soon.', 'success');
            }, 1500);
        });
    }

    // Enhanced demo button
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            setButtonLoading(this, true);
            
            setTimeout(() => {
                setButtonLoading(this, false);
                showToast('Demo Requested!', 'We will contact you shortly to schedule your demo.', 'success');
            }, 1000);
        });
    }

    // Enhanced global functions for inline event handlers
    window.deleteClient = function(id) {
        const client = clients.find(c => c.id === id);
        if (!client) return;

        if (confirm(`Are you sure you want to delete ${client.name}?`)) {
            // Show loading on the client list
            setElementLoading(clientList, true);
            
            setTimeout(() => {
                clients = clients.filter(client => client.id !== id);
                setElementLoading(clientList, false);
                renderClients();
                
                // Hide client details if deleted client was selected
                if (selectedClientId === id) {
                    selectedClientId = null;
                    if (clientDetails && !clientDetails.classList.contains('hidden')) {
                        clientDetails.style.display = 'none';
                        if (emptyState) emptyState.style.display = 'block';
                    }
                }
                
                showToast('Client Deleted', `${client.name} has been removed from your client list`, 'success');
            }, 500);
        }
    };

    window.editClient = function(id) {
        const client = clients.find(c => c.id === id);
        if (client && modal && clientForm) {
            // Fill form with client data
            clientForm.name.value = client.name;
            clientForm.company.value = client.company === 'No company' ? '' : client.company;
            clientForm.email.value = client.email;
            clientForm.phone.value = client.phone === 'No phone' ? '' : client.phone;
            
            // Remove existing client and show modal
            clients = clients.filter(c => c.id !== id);
            modal.classList.remove('hidden');
            
            // Focus first input
            setTimeout(() => {
                const firstInput = modal.querySelector('input[name="name"]');
                if (firstInput) firstInput.focus();
            }, 100);
            
            showToast('Edit Mode', 'Modify the client details and save', 'info', 2000);
        }
    };

    // Initialize with loading animation
    renderClients(clients, true);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape key to close modal
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
        
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
});
