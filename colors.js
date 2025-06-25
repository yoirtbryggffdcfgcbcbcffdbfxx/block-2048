// colors.js

// Palette de couleurs inspirée de 2048, mais avec une progression cyclique pour l'infini
const COLOR_PALETTE = [
    '#EEE4DA', // 0 (pour 2^1) - Blanc cassé
    '#EDE0C8', // 1 (pour 2^2) - Jaune très clair
    '#F2B179', // 2 (pour 2^3) - Orange clair
    '#F59563', // 3 (pour 2^4) - Orange moyen
    '#F67C5F', // 4 (pour 2^5) - Orange foncé
    '#F65E3B', // 5 (pour 2^6) - Rouge-orange
    '#EDCF72', // 6 (pour 2^7) - Jaune doré
    '#EDCC61', // 7 (pour 2^8) - Jaune intense
    '#EDC850', // 8 (pour 2^9) - Jaune plus foncé
    '#EDC53F', // 9 (pour 2^10) - Vert-jaune
    '#EDC22E', // 10 (pour 2^11) - Vert brillant
    '#3c3a32', // 11 (pour 2^12) - Gris foncé (peut être utilisé pour des très grands nombres ou comme "fin" de cycle)
    // Ajoute d'autres couleurs ici si tu veux une palette plus longue avant qu'elle ne se répète
    // Par exemple, des bleus, des verts foncés pour les nombres encore plus élevés
    '#00AABB', // 12 (pour 2^13) - Bleu-vert
    '#0088AA', // 13 (pour 2^14) - Bleu plus foncé
    '#006688', // 14 (pour 2^15) - Bleu très foncé
    '#4CAF50', // 15 (pour 2^16) - Vert vif (nouvelle couleur)
    '#2196F3', // 16 (pour 2^17) - Bleu ciel (nouvelle couleur)
    '#9C27B0', // 17 (pour 2^18) - Violet (nouvelle couleur)
    '#FFC107', // 18 (pour 2^19) - Ambre (nouvelle couleur)
    '#E91E63'  // 19 (pour 2^20) - Rose (nouvelle couleur)
];


// Fonction pour obtenir la couleur d'un bloc en fonction de sa valeur
function getBlockColor(value) {
    if (value <= 0 || !Number.isInteger(Math.log2(value))) {
        // Gère les cas où la valeur n'est pas une puissance de 2 valide ou est <= 0
        return '#776E65'; // Couleur par défaut pour les valeurs non valides
    }

    // Calcule la puissance de 2 (ex: log2(2)=1, log2(4)=2, log2(8)=3...)
    const power = Math.log2(value);

    // Utilise l'opérateur modulo pour boucler dans la palette
    // L'indice commence à 0, donc power - 1 est l'indice pour 2 (2^1 -> indice 0)
    const colorIndex = (power - 1) % COLOR_PALETTE.length;

    // Retourne la couleur correspondante, ou la dernière couleur si l'indice est trop grand
    return COLOR_PALETTE[colorIndex];
}

// Couleur du texte à utiliser sur les blocs (adapte en fonction de la luminosité de la couleur du bloc)
function getBlockTextColor(value) {
    const power = Math.log2(value);
    // Pour les premières couleurs claires, le texte est sombre. Pour les plus foncées, le texte est clair.
    if (power <= 3) { // Pour 2, 4, 8
        return '#776E65'; // Gris foncé
    } else { // Pour 16 et plus
        return 'white';
    }
}