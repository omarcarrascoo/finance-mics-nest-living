#!/usr/bin/env bash
set -e

# Map each module folder to its singular entity name
declare -A modules=(
  [residents]=resident
  [payments]=payment
  [categories]=category
  [budgets]=budget
  [budget-items]=budget-item
  [delinquencies]=delinquency
  [bank-reconciliation]=bank-transaction
  [reserve-fund-transactions]=reserve-fund-transaction
  [provider-expenses]=provider-expense
  [extraordinary-expenses]=extraordinary-expense
)

# Loop through and scaffold
for module in "${!modules[@]}"; do
  echo "Scaffolding $module..."
  # 1) Module
  npx nest g module modules/$module --no-spec

  # 2) Controller
  npx nest g controller modules/$module --no-spec --flat false

  # 3) Service
  npx nest g service modules/$module --no-spec

  # 4) Create entities folder and placeholder entity file
  mkdir -p src/modules/$module/entities
  touch src/modules/$module/entities/${modules[$module]}.entity.ts
done

# Finally, scaffold the reports module (no entity)
echo "Scaffolding reports module..."
npx nest g module modules/reports --no-spec
npx nest g controller modules/reports --no-spec --flat false
npx nest g service modules/reports --no-spec

echo "✅ All modules, controllers, services and entity placeholders created!"
