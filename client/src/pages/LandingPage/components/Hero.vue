<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";

import { useColorMode } from "@vueuse/core";
const mode = useColorMode();

import { ref, onMounted } from 'vue';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-vue-next";

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

const youtubeEmbedUrl = "https://www.youtube.com/embed/wf_luRrQqnQ?si=axD1Ieg0PvFIAVRE"
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
      <div class="relative group mt-14">
        <!-- Gradient shadow -->
        <!-- <div class="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl  rounded-full ">
        </div> -->

        <!-- Video container -->
        <div
          class="w-full md:w-[1200px] mx-auto aspect-video rounded-lg relative leading-none flex items-center border border-t-2 border-t-primary/30 ">
          <iframe :src="youtubeEmbedUrl" class="w-full h-full rounded-lg" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>

        <!-- Gradient effect -->
        <!-- <div
          class="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg">
        </div> -->
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
