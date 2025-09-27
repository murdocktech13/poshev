// Services and Memberships Data
const servicesData = {
    services: [
        {
            id: 'airport-transfer',
            name: 'Airport Transfer',
            description: 'One-way luxury airport transportation up to 60 miles with chauffeur service, luggage handling, and complimentary refreshments.',
            price: 225,
            duration: 'Up to 60 miles',
            image: 'https://page.gensparksite.com/v1/base64_upload/2aed2981ce676a5598a1f7b507a3d47e',
            features: ['Professional chauffeur', 'Luggage handling', 'Complimentary snack & beverage', 'Mercedes EQS electric luxury'],
            category: 'transfer'
        },
        {
            id: 'hourly-3hr',
            name: '3 Hour Service',
            description: 'Premium hourly chauffeur service with luxury Mercedes EQS electric vehicle.',
            price: 675,
            duration: '3 hours minimum',
            image: 'https://page.gensparksite.com/v1/base64_upload/dd1c8e7f81d70c93ce240f21487b53c2',
            features: ['Mercedes EQS luxury', 'Professional chauffeur', 'Premium refreshments', 'Multiple stops available'],
            category: 'hourly'
        },
        {
            id: 'hourly-4hr',
            name: '4 Hour Service',
            description: 'Extended luxury electric chauffeur service for business or leisure.',
            price: 900,
            duration: '4 hours',
            image: 'https://page.gensparksite.com/v1/base64_upload/316850b2d39b2b8d86c74e2d1664c172',
            features: ['Mercedes EQS electric', 'Silent luxury ride', 'Climate control', 'Executive amenities'],
            category: 'hourly'
        },
        {
            id: 'half-day',
            name: 'Half Day Service',
            description: 'Full half-day luxury electric chauffeur service for extended travel needs.',
            price: 1800,
            duration: '8 hours',
            image: 'https://page.gensparksite.com/v1/base64_upload/9d37ec98f8c633356284d057ddb30678',
            features: ['8-hour availability', 'Mercedes EQS comfort', 'Premium concierge service', 'Multiple destinations'],
            category: 'extended'
        },
        {
            id: 'full-day',
            name: 'Full Day Service',
            description: 'Complete day luxury electric chauffeur service for executive needs.',
            price: 2700,
            duration: '12 hours',
            image: 'https://page.gensparksite.com/v1/base64_upload/903cb24da66686c9f8fd87e9166ea54b',
            features: ['12-hour availability', 'All-day flexibility', 'Executive service', 'Premium amenities'],
            category: 'extended'
        },
        {
            id: 'extended-day',
            name: 'Extended Day Service',
            description: 'Premium extended day service for special events and executive travel.',
            price: 3600,
            duration: '16 hours',
            image: 'https://page.gensparksite.com/v1/base64_upload/4f10afab4e77c3829c20274b228aca1e',
            features: ['16-hour coverage', 'Special event ready', 'Luxury Mercedes EQS', 'White-glove service'],
            category: 'premium'
        }
    ],
    
    memberships: [
        {
            id: 'silver',
            name: 'POSH Member',
            price: 199,
            period: 'monthly',
            discount: 15,
            color: 'silver',
            description: 'Exclusive membership for luxury electric transportation experiences.',
            features: [
                '15% discount on all services',
                'Priority booking & scheduling',
                'Complimentary premium amenities',
                'Personal concierge service',
                'Mercedes EQS fleet access',
                'Flexible cancellation policy'
            ],
            popular: false
        },
        {
            id: 'gold',
            name: 'POSH Elite',
            price: 399,
            period: 'monthly',
            discount: 20,
            color: 'gold',
            description: 'Premium membership for distinguished clients who value excellence.',
            features: [
                '20% discount on all services',
                'Guaranteed vehicle availability',
                'Premium refreshment service',
                'Dedicated account manager',
                'VIP event coordination',
                'Complimentary vehicle upgrades',
                'Personal shopping assistance',
                'Airport VIP lounge access'
            ],
            popular: true
        },
        {
            id: 'platinum',
            name: 'POSH Ambassador',
            price: 750,
            period: 'monthly',
            discount: 25,
            color: 'platinum',
            description: 'Ultimate luxury experience with exclusive ambassador privileges.',
            features: [
                '25% discount on all services',
                'Guaranteed premium vehicle access',
                '24/7 dedicated concierge team',
                'Exclusive Mercedes EQS fleet',
                'Private event invitations',
                'Complimentary luxury amenities',
                'Personal lifestyle coordination',
                'VIP celebrity-level service',
                'Direct executive access'
            ],
            popular: false
        }
    ]
};

// Render Services
function renderServices() {
    const servicesGrid = document.getElementById('services-grid');
    const serviceSelect = document.getElementById('service-select');
    
    if (!servicesGrid || !serviceSelect) return;
    
    servicesGrid.innerHTML = '';
    
    servicesData.services.forEach(service => {
        // Create service card
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card bg-black rounded-xl overflow-hidden border border-gray-700 hover:border-white transition-all duration-300';
        serviceCard.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img src="${service.image}" alt="${service.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-4 left-4">
                    <h3 class="text-xl font-playfair font-bold text-white">${service.name}</h3>
                    <p class="text-white">$${service.price}+ / ${service.duration}</p>
                </div>
            </div>
            <div class="p-6">
                <p class="text-gray-300 mb-4">${service.description}</p>
                <ul class="space-y-2">
                    ${service.features.map(feature => `
                        <li class="flex items-center text-sm">
                            <i class="fas fa-check text-white mr-2"></i>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
                <button class="w-full mt-6 bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition-colors" onclick="selectService('${service.id}')"
                    Select Service
                </button>
            </div>
        `;
        servicesGrid.appendChild(serviceCard);
        
        // Add to service select dropdown
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} - $${service.price}+`;
        serviceSelect.appendChild(option);
    });
}

// Render Memberships
function renderMemberships() {
    const membershipsGrid = document.getElementById('memberships-grid');
    const membershipSelect = document.getElementById('membership-select');
    
    if (!membershipsGrid || !membershipSelect) return;
    
    membershipsGrid.innerHTML = '';
    
    servicesData.memberships.forEach(membership => {
        // Determine colors based on membership type
        let borderColor, bgGradient, textColor;
        switch(membership.color) {
            case 'silver':
                borderColor = 'border-gray-400';
                bgGradient = 'from-gray-600/20 to-gray-800/20';
                textColor = 'text-gray-300';
                break;
            case 'gold':
                borderColor = 'border-white';
                bgGradient = 'from-white/10 to-gray-600/20';
                textColor = 'text-white';
                break;
            case 'platinum':
                borderColor = 'border-purple-400';
                bgGradient = 'from-purple-600/20 to-purple-800/20';
                textColor = 'text-purple-300';
                break;
        }
        
        // Create membership card
        const membershipCard = document.createElement('div');
        membershipCard.className = `membership-card relative bg-gradient-to-br ${bgGradient} rounded-xl p-6 border ${borderColor} ${membership.popular ? 'ring-2 ring-white' : ''}`;
        
        if (membership.popular) {
            membershipCard.innerHTML += `
                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span class="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
            `;
        }
        
        membershipCard.innerHTML += `
            <div class="text-center">
                <h3 class="text-2xl font-playfair font-bold ${textColor} mb-2">${membership.name}</h3>
                <div class="mb-4">
                    <span class="text-4xl font-bold ${textColor}">$${membership.price}</span>
                    <span class="text-gray-400">/${membership.period}</span>
                </div>
                <p class="text-gray-300 mb-6">${membership.description}</p>
                
                <div class="bg-black/30 rounded-lg p-4 mb-6">
                    <div class="text-center mb-4">
                        <span class="text-2xl font-bold ${textColor}">${membership.discount}% OFF</span>
                        <p class="text-sm text-gray-400">All Services</p>
                    </div>
                </div>
                
                <ul class="space-y-3 mb-8">
                    ${membership.features.map(feature => `
                        <li class="flex items-start text-sm">
                            <i class="fas fa-crown ${textColor} mr-3 mt-1"></i>
                            <span class="text-gray-300">${feature}</span>
                        </li>
                    `).join('')}
                </ul>
                
                <button class="w-full bg-${membership.color === 'gold' ? 'white' : membership.color === 'platinum' ? 'gray-300' : 'gray-600'} ${membership.color === 'gold' ? 'text-black' : 'text-white'} py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold" onclick="selectMembership('${membership.id}')"
                    Choose ${membership.name}
                </button>
            </div>
        `;
        membershipsGrid.appendChild(membershipCard);
        
        // Add to membership select dropdown
        const option = document.createElement('option');
        option.value = membership.id;
        option.textContent = `${membership.name} - ${membership.discount}% discount`;
        membershipSelect.appendChild(option);
    });
}

// Service Selection Functions
function selectService(serviceId) {
    const serviceSelect = document.getElementById('service-select');
    if (serviceSelect) {
        serviceSelect.value = serviceId;
        serviceSelect.dispatchEvent(new Event('change'));
    }
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function selectMembership(membershipId) {
    const membershipSelect = document.getElementById('membership-select');
    if (membershipSelect) {
        membershipSelect.value = membershipId;
        membershipSelect.dispatchEvent(new Event('change'));
    }
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Get service by ID
function getServiceById(serviceId) {
    return servicesData.services.find(service => service.id === serviceId);
}

// Get membership by ID
function getMembershipById(membershipId) {
    return servicesData.memberships.find(membership => membership.id === membershipId);
}

// Calculate price with membership discount
function calculatePrice(serviceId, membershipId = null) {
    const service = getServiceById(serviceId);
    if (!service) return 0;
    
    let price = service.price;
    
    if (membershipId) {
        const membership = getMembershipById(membershipId);
        if (membership) {
            const discount = (price * membership.discount) / 100;
            price = price - discount;
        }
    }
    
    return Math.round(price * 100) / 100; // Round to 2 decimal places
}

// Initialize services and memberships
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    renderMemberships();
});

// Export for use in other modules
window.servicesModule = {
    servicesData,
    getServiceById,
    getMembershipById,
    calculatePrice,
    selectService,
    selectMembership
};