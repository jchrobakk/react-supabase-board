create table user_profiles (
    user_id uuid primary key references auth.users (id) not null,
    username text unique not null,
    constraint proper_username check (username ~* '^[a-zA-Z0-9_]+$'),
    constraint username_length check (char_length(username) >= 3 and char_length(username) <= 16)
);

alter table user_profiles enable row level security;

create policy "anyone can see user_profiles" on "public"."user_profiles"
AS PERMISSIVE FOR SELECT    
TO public
using (true);

create policy "users can insert user_profiles" on "public"."user_profiles"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

create policy "users can update own profiles" on "public"."user_profiles"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);