#!/bin/bash
tableinfo="$(echo "$(echo "\dt $1.*" | psql -h localhost -U $1 -d top22)" | tail -n +4 | sed \$d)"
for table in "$tableinfo"; do
  tables="$tables $(cut -d '|' -f 2 <<< "$table")"
done
tables="${tables//_prisma_migrations/}"
for table in $tables; do
  sql="$sql DELETE FROM $1.\"$table\";"
  sql="$sql INSERT INTO $1.\"$table\" SELECT * FROM testdata.\"$table\";"
done

if [ -z "$sql" ]; then
  echo ""
  echo "-> Is your database schema is populated?"
  exit
fi

export IFS=";"
for statement in $sql; do
  echo "$statement;"
done

echo "WARNING: Your existing data in schema $1 will be lost!"
read -p "Execute? [y/N] " confirmation
case $confirmation in
  y|Y|yes|YES)
    echo "$sql" | psql -h localhost -U $1 -d top22
  ;;
esac
