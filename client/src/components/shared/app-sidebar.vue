<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { supabaseCli } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

import { RouterLink, useRouter } from "vue-router";
import { Book, Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-vue-next"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "@/components/ui/sidebar"
import {
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { onBeforeMount, ref } from "vue";

const items = [
    {
        title: "Dashboard",
        url: "/app",
        icon: Book,
    },
    {
        title: "Books",
        url: "/books",
        icon: Inbox,
    },
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]
const router = useRouter()
const userStore = useUserStore()
const handleLogout = async () => {
    const res = await userStore.logOut()
    if (res?.success) {
        console.log(res.message)
        router.push('/login')
    }
}

const userData = ref<User>()
onBeforeMount(async () => {
    const { data: { user } } = await supabaseCli.auth.getUser()
    if (user) userData.value = user
})

</script>

<template>
    <Sidebar class="">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <span class="text-lg font-medium">
                                    Joy Read
                                </span>
                                <ChevronDown class="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
                            <DropdownMenuItem>
                                <RouterLink to="/">
                                    <span>Landing page</span>
                                </RouterLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button @click="handleLogout">Log out</Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent class="mt-2 xl:mt-8">
            <SidebarGroup>
                <SidebarGroupLabel>Main</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in items" :key="item.title" class="hover:bg-slate-50">
                            <SidebarMenuButton asChild class="min-h-10">
                                <RouterLink :to="item.url">
                                    <component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter class="flex flex-row">
            <Avatar>
                <AvatarImage :src="userData?.identities[0].identity_data.avatar_url" />
                <AvatarFallback><img src="/favicon.ico" /></AvatarFallback>
            </Avatar>
            <div class="flex flex-col font-medium">
                <div>
                    {{ userData?.identities[0].identity_data.name }}
                </div>
                <div class="text-xs text-gray-600">
                    {{ userData?.email }}
                </div>
            </div>
        </SidebarFooter>
    </Sidebar>
</template>