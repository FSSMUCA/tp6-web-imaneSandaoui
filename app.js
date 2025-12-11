// Tableau pour stocker l'historique des opérations
let operationsHistory = [];

// Éléments DOM
const calculatorForm = document.getElementById('calculator-form');
const errorContainer = document.getElementById('error-container');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

// Fonction pour afficher un message d'erreur
function showError(message) {
    errorContainer.innerHTML = `
        <div class="error-title">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Erreur</span>
        </div>
        <div class="error-message">${message}</div>
    `;
    errorContainer.classList.add('show');
    
    // Masquer l'erreur après 5 secondes
    setTimeout(() => {
        errorContainer.classList.remove('show');
    }, 5000);
}

// Fonction pour effacer les messages d'erreur
function clearError() {
    errorContainer.classList.remove('show');
    errorContainer.innerHTML = '';
}

// Fonction pour formater la date actuelle
function getCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Fonction pour effectuer le calcul
function calculate(numberA, numberB, operation) {
    switch(operation) {
        case '+':
            return numberA + numberB;
        case '-':
            return numberA - numberB;
        case '*':
            return numberA * numberB;
        case '/':
            return numberA / numberB;
        default:
            throw new Error('Opération non valide');
    }
}

// Fonction pour obtenir le symbole d'opération
function getOperationSymbol(operation) {
    const symbols = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    return symbols[operation] || operation;
}

// Fonction pour ajouter une opération à l'historique
function addToHistory(numberA, numberB, operation, result) {
    const operationData = {
        numberA,
        numberB,
        operation,
        result,
        timestamp: getCurrentDateTime(),
        id: Date.now() // ID unique basé sur le timestamp
    };
    
    // Ajouter au début du tableau
    operationsHistory.unshift(operationData);
    
    // Mettre à jour l'affichage
    updateHistoryDisplay();
    
    // Sauvegarder dans localStorage
    saveHistoryToLocalStorage();
}

// Fonction pour mettre à jour l'affichage de l'historique
function updateHistoryDisplay() {
    if (operationsHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-info-circle"></i>
                <p>Aucune opération effectuée</p>
                <p class="subtext">Les calculs apparaîtront ici</p>
            </div>
        `;
        return;
    }
    
    // Créer le HTML pour chaque opération
    const historyHTML = operationsHistory.map(op => `
        <div class="history-item" data-id="${op.id}">
            <div>
                <div class="history-operation">
                    ${op.numberA} ${getOperationSymbol(op.operation)} ${op.numberB}
                </div>
                <div class="history-date">${op.timestamp}</div>
            </div>
            <div class="history-result">= ${op.result.toFixed(2)}</div>
        </div>
    `).join('');
    
    historyList.innerHTML = historyHTML;
}

// Fonction pour sauvegarder l'historique dans localStorage
function saveHistoryToLocalStorage() {
    try {
        localStorage.setItem('calculatorHistory', JSON.stringify(operationsHistory));
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
    }
}

// Fonction pour charger l'historique depuis localStorage
function loadHistoryFromLocalStorage() {
    try {
        const savedHistory = localStorage.getItem('calculatorHistory');
        if (savedHistory) {
            operationsHistory = JSON.parse(savedHistory);
            updateHistoryDisplay();
        }
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        operationsHistory = [];
    }
}

// Fonction pour effacer l'historique
function clearHistory() {
    if (operationsHistory.length === 0) return;
    
    if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
        operationsHistory = [];
        updateHistoryDisplay();
        localStorage.removeItem('calculatorHistory');
        showError('Historique effacé avec succès');
    }
}

// Gestion de la soumission du formulaire
calculatorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    clearError();
    
    // Récupération des valeurs
    const numberAInput = document.getElementById('numberA');
    const numberBInput = document.getElementById('numberB');
    const operationSelect = document.getElementById('operation');
    
    const numberA = parseFloat(numberAInput.value);
    const numberB = parseFloat(numberBInput.value);
    const operation = operationSelect.value;
    
    // Validation des données
    if (isNaN(numberA) || isNaN(numberB)) {
        showError('Veuillez entrer des nombres valides dans les deux champs');
        return;
    }
    
    if (!operation) {
        showError('Veuillez sélectionner une opération');
        return;
    }
    
    // Validation spécifique pour la division par zéro
    if (operation === '/' && numberB === 0) {
        showError('Division par zéro impossible');
        return;
    }
    
    try {
        // Effectuer le calcul
        const result = calculate(numberA, numberB, operation);
        
        // Ajouter à l'historique
        addToHistory(numberA, numberB, operation, result);
        
        // Afficher le succès
        errorContainer.innerHTML = `
            <div class="error-title" style="color: #27ae60;">
                <i class="fas fa-check-circle"></i>
                <span>Succès</span>
            </div>
            <div class="error-message" style="color: #27ae60;">
                ${numberA} ${getOperationSymbol(operation)} ${numberB} = ${result.toFixed(2)}
            </div>
        `;
        errorContainer.classList.add('show');
        
        // Réinitialiser le formulaire
        calculatorForm.reset();
        
        // Masquer le message après 3 secondes
        setTimeout(() => {
            errorContainer.classList.remove('show');
        }, 3000);
        
    } catch (error) {
        showError(error.message);
    }
});

// Gestion du bouton d'effacement de l'historique
clearHistoryBtn.addEventListener('click', clearHistory);

// Charger l'historique au démarrage
document.addEventListener('DOMContentLoaded', function() {
    loadHistoryFromLocalStorage();
    
    // Ajouter un événement pour effacer les erreurs en cliquant dessus
    errorContainer.addEventListener('click', clearError);
});