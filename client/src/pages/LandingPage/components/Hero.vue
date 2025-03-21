<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";

import { useColorMode } from "@vueuse/core";
const mode = useColorMode();

import { ref, onMounted } from 'vue';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { ArrowRight, Icon } from "lucide-vue-next";

const { isLoggedIn } = useUserStore()
const user = ref<boolean | undefined>(false)
onMounted(async () => {
  try {
    const isLogged = await isLoggedIn()
    user.value = isLogged
  } catch (error) {
    console.error(error)
  }
})

const youtubeVideoUrlEn = "https://www.youtube.com/embed/wf_luRrQqnQ?si=axD1Ieg0PvFIAVRE"
const youtubeVideoUrlVn = "https://www.youtube.com/embed/wf_luRrQqnQ?si=axD1Ieg0PvFIAVRE"
</script>

<template>
  <section class="container">
    <div class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
      <div class="text-center space-y-8">
        <Badge variant="outline" class="text-sm py-2">
          <span class="mr-2 text-primary">
            <Badge>New</Badge>
          </span>
          <span> Design is out now! </span>
        </Badge>

        <div class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold">
          <h1>
            Reading tool that every
            <span class="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">Language learner
            </span>
            deserves
          </h1>
        </div>

        <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          We're more than just a tool, we're a community of passionate creators.
          Get access to exclusive resources, tutorials, and support.
        </p>

        <div class="space-y-4 md:space-y-0 md:space-x-4">
          <RouterLink :to="user ? '/app' : '/sign-up'">
            <Button class="font-bold group/arrow">
              Get Started
              <ArrowRight class="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>
          </RouterLink>
          <RouterLink v-if="user" to="/app">
            <Button variant="secondary" class="font-bold">
              DashBoard
            </Button>
          </RouterLink>
          <RouterLink v-else to="/login">
            <Button variant="ghost" class="font-bold">
              Login
            </Button>
          </RouterLink>
        </div>
      </div>
      <div id="hero" class="relative group mt-14 w-full flex flex-col ">
        <Tabs default-value="account" class="w-full space-y-4 xl:space-y-8 2xl:space-y-10">
          <TabsContent value="account">
            <div
              class="w-full md:w-[1200px] mx-auto aspect-video rounded-lg relative leading-none flex items-center border border-t-2 border-t-primary/30 ">
              <iframe :src="youtubeVideoUrlEn" class="w-full h-full rounded-lg" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div
              class="w-full md:w-[1200px] mx-auto aspect-video rounded-lg relative leading-none flex items-center border border-t-2 border-t-primary/30 ">
              <iframe :src="youtubeVideoUrlEn" class="w-full h-full rounded-lg" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
          </TabsContent>
          <div class="mx-auto">
            <TabsList class="grid grid-cols-2 w-[100px] self-center mx-auto">
              <TabsTrigger value="account">
                En
              </TabsTrigger>
              <TabsTrigger value="password">
                VI
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  </section>
</template>

<style scoped>
.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation-name: img-border-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes img-shadow-animation {
  from {
    opacity: 0.5;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes img-border-animation {
  from {
    @apply border-t-primary/10;
  }

  to {
    @apply border-t-primary/60;
  }
}
</style>
