<template>
  <div class="mb-8">
    <nav class="flex mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2">
        <li>
          <NuxtLink to="/" class="text-slate-500 dark:text-slate-400 hover:text-[#4fc08d] transition-colors">
            Plugins
          </NuxtLink>
        </li>
        <li>
          <Icon name="lucide:chevron-right" class="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </li>
        <li>
          <span class="text-[#2c3e50] dark:text-slate-100 font-semibold">{{ plugin.name }}</span>
        </li>
      </ol>
    </nav>
    
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <h1 class="text-4xl font-bold text-[#2c3e50] dark:text-slate-100 mb-3">{{ plugin.name }}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{{ plugin.description }}</p>
        
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#4fc08d]/10 text-[#4fc08d] border border-[#4fc08d]/20">
            {{ plugin.category }}
          </span>
          <div class="flex items-center text-slate-600 dark:text-slate-300">
            <Icon name="lucide:user" class="h-4 w-4 mr-1" />
            <template v-for="(author, index) in authors" :key="typeof author === 'string' ? author : author.name">
              <template v-if="typeof author === 'string'">
                {{ author }}
              </template>
              <a
                v-else
                target="_blank"
                class="text-[#4fc08d] hover:text-[#42b883] transition-colors"
                :href="author.github_url"
              >{{ author.name }}
                <Icon name="lucide:external-link" class="h-4 w-4" /></a>
              <span v-if="index < authors.length - 1" class="mr-1">, </span>
            </template>
          </div>
          <div class="flex items-center text-slate-600 dark:text-slate-300">
            <Icon name="lucide:calendar" class="h-4 w-4 mr-1" />
            Updated {{ formatDate(plugin.lastCommit) }}
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-6">
          <span 
            v-for="tag in plugin.tags" 
            :key="tag"
            class="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Author, PluginWithStats } from '~/types'

interface Props {
  plugin: PluginWithStats
}

const props = defineProps<Props>()

const {plugin} = toRefs(props)

const authors = computed<Author[]>(() => {
  // must be an array
  const authorsArray = Array.isArray(plugin.value.author)
    ? plugin.value.author
    : [plugin.value.author]

  // Guard: The `github_url` must have a GitHub URL Prefix. If not, handle the `name` as a string and ignore the URL.
  const githubUrlRegex = /^https:\/\/(www\.)?github\.com\//
  return authorsArray.map((author) => {
    if (typeof author === 'string')
      return author
    if (author.github_url && githubUrlRegex.test(author.github_url))
      return author
    return author.name
  })
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
