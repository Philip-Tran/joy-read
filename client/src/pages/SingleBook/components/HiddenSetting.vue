<script setup lang="ts">
import { useUserSettingStore } from '@/stores/UserSettingStore';

import { ref } from 'vue';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import ToggleTheme from '@/pages/LandingPage/components/ToggleTheme.vue';

const settingStore = useUserSettingStore()
const isAudioVisible = ref(false)
const togglePopupTranslation = () => {
    console.log("checked")
    settingStore.updatePopupState()
}

const toggleAudioPlayer = () => {
    settingStore.toggleAudioPlayer()
}
</script>

<template>
    <div class="fixed top-4 right-4">
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost"
                    class="bg-transparent text-transparent  hover:bg-slate-100 focus:ring-2 focus:ring-blue-500">
                    Open Settings
                </Button>
            </PopoverTrigger>
            <PopoverContent class="p-6 bg-white shadow-lg mr-4 rounded-lg border border-gray-200 max-w-sm">
                <div class="grid gap-6">
                    <!-- Header Section -->
                    <!-- <div class="space-y-2">
                        <h4 class="font-semibold text-lg leading-tight text-gray-900">
                            Change Settings
                        </h4>
                        <p class="text-sm text-gray-600">
                            See changes in real-time.
                        </p>
                    </div> -->

                    <!-- Options Section -->
                    <div class="space-y-4">
                        <!-- Popup Translation Option -->
                        <div class="grid grid-cols-3 items-center gap-4">
                            <Label for="popupTranslation" class="col-span-2 text-gray-700 text-sm font-medium">
                                Popup Translation
                            </Label>
                            <Switch id="popupTranslation" class="col-span-1" @update:checked="togglePopupTranslation">
                            </Switch>
                        </div>

                        <!-- Hide Audio Player Option -->
                        <div class="grid grid-cols-3 items-center gap-4">
                            <Label for="hideAudioPlayer" class="col-span-2 text-gray-700 text-sm font-medium">
                                Hide Audio Player
                            </Label>
                            <Switch id="hideAudioPlayer" class="col-span-1" v-model:checked="isAudioVisible"
                                @update:checked="toggleAudioPlayer"></Switch>
                        </div>

                        <!-- change color mode -->
                        <div class="grid grid-cols-3 items-center gap-4">
                            <Label for="hideAudioPlayer" class="col-span-2 text-gray-700 text-sm font-medium">
                                Change color mode
                            </Label>
                            <ToggleTheme />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>