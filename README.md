# marshmello

## Stack

- AdonisJS
- React.js

## Fonctionnalités

### Projets

- [x] Créer un projet
- [x] Renommer un projet
- [x] Supprimer un projet (et tous les statuts et toutes les tâches associés)

### Statuts

- [x] Lister les statuts d'un projet
- [x] Créer un statut
- [x] Renommer un statut
- [x] Supprimer un statut (et déplacer les tâches dans un statut "non classé")
- [x] Changer l'ordre des statuts

### Tâches

- [x] Créer une tâche
- [x] Modifier une tâche
- [x] Supprimer une tâche
- [x] Déplacer une tâche d'un statut à un autre
- [x] Toggle une tâche (terminée/non terminée)

### Utilisateurs

- [x] Créer un compte
- [x] Se connecter
- [x] Se déconnecter
- [x] Supprimer son compte

## Modèles

```yaml
users:
 - id integer PK UNIQUE NOT NULL
 - uuid uuid UNIQUE NOT NULL
 - username varchar(50) UNIQUE NOT NULL
 - password varchar NOT NULL
 - created_at timestamp NOT NULL DEFAULT NOW()
 - updated_at timestamp NOT NULL DEFAULT NOW()

projects:
 - id integer PK UNIQUE NOT NULL
 - uuid uuid UNIQUE NOT NULL
 - name varchar NOT NULL
 - user_id integer FK users.id ON DELETE CASCADE
 - created_at timestamp NOT NULL DEFAULT NOW()
 - updated_at timestamp NOT NULL DEFAULT NOW()

statuses:
 - id integer PK UNIQUE NOT NULL
 - uuid uuid UNIQUE NOT NULL
 - name varchar NOT NULL
 - project_id integer FK projects.id ON DELETE CASCADE
 - order smallint NOT NULL
 - created_at timestamp NOT NULL DEFAULT NOW()
 - updated_at timestamp NOT NULL DEFAULT NOW()

todos:
 - id integer PK UNIQUE NOT NULL
 - uuid uuid UNIQUE NOT NULL
 - name varchar NOT NULL
 - description text NULL DEFAULT NULL
 - completed boolean NOT NULL DEFAULT false
 - status_id integer FK statuses.id ON DELETE SET NULL
 - project_id integer FK projects.id ON DELETE CASCADE
 - created_at timestamp NOT NULL DEFAULT NOW()
 - updated_at timestamp NOT NULL DEFAULT NOW()
```
