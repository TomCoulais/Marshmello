NODE := "docker compose exec node"
PNPM := NODE + "pnpm"
API := NODE + "pnpm -F api"

ace +args:
	{{API}} ace {{args}}

pnpm +args:
	{{pnpm}} {{args}

api +args:
	{{API}} {{args}

ncu pkg="api":
	{{NODE}} ncu -iu --workspace="@marshmello/{{pkg}}"

shell:
	docker compose exec -it node bash