# Utiliser l'image officielle d'Adminer comme base
FROM adminer:latest

# Copier le thème Hydra Dark dans le répertoire des thèmes d'Adminer
COPY Hydra-Dark-Theme-for-Adminer/hydra-dark.css /var/www/html/themes/

# Changer la permission du fichier
RUN chmod 644 /var/www/html/themes/hydra-dark.css
