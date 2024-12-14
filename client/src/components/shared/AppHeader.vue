<script setup lang="ts">
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="flex flex-row py-2 px-4 items-center space-x-4 border-b w-full max-h-[70px]">
        <div class="flex items-center justify-between">
            <SidebarTrigger />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <RouterLink to="/">
                            Home
                        </RouterLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <RouterLInk to="/books">
                            Reading
                        </RouterLInk>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Books</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div>
            right
        </div>
    </div>
</template>