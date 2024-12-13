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
                <Button variant="ghost" class="bg-transparent text-transparent"> Open setting</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div class="grid gap-4">
                    <div class="space-y-2">
                        <h4 class="font-medium leading-none">
                            Change setting
                        </h4>
                        <p class="text-sm text-muted-foreground">
                            See changes in real time
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <div class="grid-cols-3 items-center gap-4">
                            <Label for="width" class="col-span-2">Popup Translation</Label>
                            <Switch class="col-span-1" @update:checked="togglePopupTranslation">

                            </Switch>
                        </div>
                        <div class="grid-cols-3 items-center gap-4">
                            <Label for="width" class="col-span-2">Hide audio player</Label>
                            <Switch class="col-span-1" v-model:checked="isAudioVisible"
                                @update:checked="toggleAudioPlayer">

                            </Switch>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>