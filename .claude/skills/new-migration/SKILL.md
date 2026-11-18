---
name: new-migration
description: Create a Supabase database migration for DARDANIC with RLS policies, seed data and regenerated TypeScript types. Use for any table, column, index, function, trigger or policy change.
---

# New migration

1. `supabase migration new <short_snake_name>` → edit the new file in `supabase/migrations/`.
2. In the **same file** for every new table:
   - `alter table … enable row level security;`
   - Policies for each needed action (select / insert / update / delete), using `auth.uid()`. Default to least access; explain each policy in a SQL comment.
   - Foreign keys, `created_at timestamptz default now()`, and indexes for columns used in filters/joins.
3. Never edit a migration that's already been applied/committed. Write a new one instead.
4. Update `supabase/seed.sql` with a little realistic test data (no real personal data).
5. Apply locally: `supabase db reset`. Fix any errors.
6. Regenerate types: `supabase gen types typescript --local > packages/shared/types/database.ts`.
7. Run typecheck and fix anything the new types break.
8. Explain the schema change and policies to the user in plain language.
