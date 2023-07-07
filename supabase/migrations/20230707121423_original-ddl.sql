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

create table posts (
    id uuid primary key default uuid_generate_v4() not null,
    user_id uuid references auth.users (id) default auth.uid() not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    title text not null,
    content text not null,
    constraint title_length check (char_length(title) >= 3 and char_length(title) <= 100),
    constraint content_length check (char_length(content) >= 3 and char_length(content) <= 10000)
);

create function get_posts(page_number int)
returns table (
    id uuid,
    user_id uuid,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    title text,
    content text,
    username text
)
language plpgsql
as $$
begin
    return query
    select posts.id, posts.user_id, posts.created_at, posts.updated_at, posts.title, posts.content, user_profiles.username
    from posts
    inner join user_profiles on posts.user_id = user_profiles.user_id
    order by posts.created_at desc
    limit 10
    offset (page_number - 1) * 10;
end;
$$;

alter table posts enable row level security;

create policy "anyone can see posts" on "public"."posts"
AS PERMISSIVE FOR SELECT
TO public
using (true);

CREATE POLICY "users can insert posts"
ON public.posts
FOR INSERT 
TO authenticated 
WITH CHECK (true);

create policy "users can update own posts" on "public"."posts"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id);

create policy "users can delete own posts" on "public"."posts"
AS PERMISSIVE FOR DELETE
TO public
USING (auth.uid() = user_id);