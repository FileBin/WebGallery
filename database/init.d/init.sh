#!/bin/bash
set -e

source /docker-entrypoint-initdb.d/innoshop_user.env

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER $DB_USER WITH PASSWORD '$DB_USER_PASSWORD';

	CREATE DATABASE auth_server;
	ALTER DATABASE auth_server OWNER TO $DB_USER;
	GRANT ALL PRIVILEGES ON DATABASE auth_server TO $DB_USER;
	GRANT USAGE, CREATE ON SCHEMA public TO $DB_USER;
EOSQL
