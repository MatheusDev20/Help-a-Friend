
# Criar uma imagem do Postgres (ultima versão)
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
# Listar todos os containers
docker container ls -a
# Remover um container 
dokcer container rm [container_id]
# Entrar na role do postgres com o user postgres
sudo -i -u postgres

# Criar uma nova migration com o TypeORM  
