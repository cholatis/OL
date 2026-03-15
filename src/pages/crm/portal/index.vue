<script setup lang="ts">
import { useCRMStore } from '@/stores/crm'

const crmStore = useCRMStore()

const permissions = ['VIEW_CONTRACT', 'VIEW_INVOICE', 'MAKE_PAYMENT', 'DOWNLOAD_DOCS', 'SUBMIT_CLAIM']
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="การจัดการ Customer Portal">
         <template #append>
           <VBtn color="primary" prepend-icon="tabler-user-plus">Invite User</VBtn>
         </template>
         <VTable hover>
           <thead>
             <tr>
               <th>Company</th>
               <th>User / Contact</th>
               <th>Email</th>
               <th>Permissions</th>
               <th>Last Login</th>
               <th>Status</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="p in crmStore.portalAccess" :key="p.portalUserId">
               <td class="font-weight-bold">{{ crmStore.getCustomerById(p.customerId)?.companyName }}</td>
               <td>{{ crmStore.getCustomerById(p.customerId)?.contactPersons.find(cp => cp.contactId === p.contactPersonId)?.name }}</td>
               <td>{{ p.email }}</td>
               <td>
                 <div class="d-flex gap-1 flex-wrap">
                   <VChip v-for="perm in p.permissions" :key="perm" size="x-small" label>{{ perm.split('_')[1] }}</VChip>
                 </div>
               </td>
               <td>{{ p.lastLogin ? new Date(p.lastLogin).toLocaleString() : 'Never' }}</td>
               <td>
                 <VChip :color="p.isActive ? 'success' : 'secondary'" size="x-small">{{ p.isActive ? 'ACTIVE' : 'DISABLED' }}</VChip>
               </td>
               <td>
                 <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-key" /></VBtn>
                 <VBtn icon size="x-small" variant="text" color="error"><VIcon icon="tabler-ban" /></VBtn>
               </td>
             </tr>
           </tbody>
         </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
