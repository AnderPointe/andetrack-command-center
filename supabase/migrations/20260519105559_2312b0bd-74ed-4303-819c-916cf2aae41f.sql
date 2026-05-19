-- Storage bucket for POD signatures + photos (private; per-company access via path prefix)
insert into storage.buckets (id, name, public)
values ('proof-of-delivery', 'proof-of-delivery', false)
on conflict (id) do nothing;

-- Members of a company can read POD files stored under their company_id/ prefix
create policy "company read pod files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'proof-of-delivery'
  and public.is_company_member(auth.uid(), ((storage.foldername(name))[1])::uuid)
);

-- Members of a company can upload POD files under their company_id/ prefix
create policy "company upload pod files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'proof-of-delivery'
  and public.is_company_member(auth.uid(), ((storage.foldername(name))[1])::uuid)
);

-- Managers can update / delete POD files in their company
create policy "managers update pod files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'proof-of-delivery'
  and public.can_manage_company(auth.uid(), ((storage.foldername(name))[1])::uuid)
);

create policy "managers delete pod files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'proof-of-delivery'
  and public.can_manage_company(auth.uid(), ((storage.foldername(name))[1])::uuid)
);