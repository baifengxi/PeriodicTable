<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { categories, elements, stats } from './data/elements'

const themes = [
  { id: 'quantum', name: '量子蓝域' },
  { id: 'solar', name: '恒星熔炉' },
  { id: 'aurora', name: '极光矩阵' },
  { id: 'ember', name: '赤焰轨道' },
  { id: 'nebula', name: '星云幻境' },
  { id: 'carbon', name: '碳基终端' },
]

const search = ref('')
const activeCategory = ref('all')
const activeElement = ref(null)
const activeTheme = ref(themes[0].id)
const floatingCardStyle = ref({})
const boardRef = ref(null)
const particleCanvasRef = ref(null)

let animationFrameId = 0
let resizeObserver = null
let particles = []
let particleCtx = null
let clickPulse = null

function createParticle(symbol, width, height) {
  return {
    symbol,
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: 10 + Math.random() * 5,
    alpha: 0.35 + Math.random() * 0.45,
  }
}

function initializeParticles() {
  const canvas = particleCanvasRef.value
  if (!canvas) {
    return
  }

  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))
  particleCtx = canvas.getContext('2d')

  if (!particleCtx) {
    return
  }

  particleCtx.setTransform(1, 0, 0, 1, 0, 0)
  particleCtx.scale(dpr, dpr)

  particles = elements.map((element) => createParticle(element.symbol, rect.width, rect.height))
}

function drawParticles() {
  const canvas = particleCanvasRef.value
  const ctx = particleCtx
  if (!canvas || !ctx) {
    return
  }

  const rect = canvas.getBoundingClientRect()
  const width = rect.width
  const height = rect.height

  ctx.clearRect(0, 0, width, height)
  ctx.font = '600 14px "Chakra Petch", "Courier New", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const accent = getComputedStyle(canvas).getPropertyValue('--accent').trim() || '#6ee7ff'

  particles.forEach((particle, index) => {
    particle.vx += (Math.random() - 0.5) * 0.08
    particle.vy += (Math.random() - 0.5) * 0.08

    if (clickPulse) {
      const dx = particle.x - clickPulse.x
      const dy = particle.y - clickPulse.y
      const distance = Math.max(18, Math.hypot(dx, dy))
      const force = Math.max(0, (clickPulse.radius - distance) / clickPulse.radius)
      particle.vx += (dx / distance) * force * 0.85
      particle.vy += (dy / distance) * force * 0.85
    }

    particle.vx *= 0.985
    particle.vy *= 0.985
    particle.x += particle.vx
    particle.y += particle.vy

    if (particle.x < 12 || particle.x > width - 12) {
      particle.vx *= -1
      particle.x = Math.min(width - 12, Math.max(12, particle.x))
    }

    if (particle.y < 12 || particle.y > height - 12) {
      particle.vy *= -1
      particle.y = Math.min(height - 12, Math.max(12, particle.y))
    }

    ctx.fillStyle = accent
    ctx.globalAlpha = particle.alpha
    ctx.fillText(particle.symbol, particle.x, particle.y)

    if (index % 9 === 0) {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y + 12, 1.2, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  ctx.globalAlpha = 1

  if (clickPulse) {
    clickPulse.radius += 8
    clickPulse.life -= 1
    ctx.strokeStyle = accent
    ctx.globalAlpha = Math.max(0, clickPulse.life / 24) * 0.7
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(clickPulse.x, clickPulse.y, clickPulse.radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = 1

    if (clickPulse.life <= 0) {
      clickPulse = null
    }
  }

  animationFrameId = window.requestAnimationFrame(drawParticles)
}

function handleParticleClick(event) {
  const canvas = particleCanvasRef.value
  if (!canvas) {
    return
  }

  const rect = canvas.getBoundingClientRect()
  clickPulse = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    radius: 12,
    life: 24,
  }
}

const filteredElements = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return elements.filter((element) => {
    const matchCategory =
      activeCategory.value === 'all' || element.category === activeCategory.value
    const matchKeyword =
      !keyword ||
      element.symbol.toLowerCase().includes(keyword) ||
      element.name.toLowerCase().includes(keyword) ||
      element.chineseName.includes(keyword) ||
      String(element.number).includes(keyword)

    return matchCategory && matchKeyword
  })
})

const filteredCount = computed(() => filteredElements.value.length)
const currentTheme = computed(() =>
  themes.find((theme) => theme.id === activeTheme.value) ?? themes[0],
)

function isVisible(element) {
  return filteredElements.value.some((item) => item.symbol === element.symbol)
}

function updateFloatingCardPosition(target) {
  if (!boardRef.value || !target) {
    return
  }

  const boardRect = boardRef.value.getBoundingClientRect()
  const tileRect = target.getBoundingClientRect()
  const cardWidth = 280
  const cardHeight = 232
  const gap = 14

  let left = tileRect.right - boardRect.left + gap
  let top = tileRect.top - boardRect.top - 4

  if (left + cardWidth > boardRect.width - 12) {
    left = tileRect.left - boardRect.left - cardWidth - gap
  }

  if (left < 8) {
    left = Math.min(boardRect.width - cardWidth - 8, tileRect.left - boardRect.left)
  }

  if (top + cardHeight > boardRect.height - 8) {
    top = boardRect.height - cardHeight - 8
  }

  if (top < 8) {
    top = 8
  }

  floatingCardStyle.value = {
    left: `${Math.max(8, left)}px`,
    top: `${Math.max(8, top)}px`,
  }
}

function focusElement(element, event) {
  activeElement.value = element
  updateFloatingCardPosition(event?.currentTarget)
}

function clearActiveElement() {
  activeElement.value = null
}

onMounted(() => {
  initializeParticles()
  drawParticles()

  if (window.ResizeObserver && particleCanvasRef.value) {
    resizeObserver = new ResizeObserver(() => {
      initializeParticles()
    })
    resizeObserver.observe(particleCanvasRef.value)
  }
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId)
  }
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="app-shell" :data-theme="activeTheme">
    <div class="ambient ambient-a"></div>
    <div class="ambient ambient-b"></div>
    <div class="grid-overlay"></div>

    <section class="table-panel">
      <div class="table-hero">
        <div class="hero-title-block">
          <p class="eyebrow">Periodic Intelligence Deck</p>
          <h1 class="pixel-title"><span class="prompt-mark">&gt;</span> 元素周期表<span class="cursor-block"></span></h1>
        </div>

        <div class="pixel-orbit interactive-orbit">
          <canvas
            ref="particleCanvasRef"
            class="particle-canvas"
            @click="handleParticleClick"
          ></canvas>
        </div>
      </div>

      <div class="control-row">
        <label class="search-field">
          <span>检索元素</span>
          <input v-model="search" type="text" placeholder="输入元素名称、符号或原子序数" />
        </label>

        <label class="select-field">
          <span>元素分类</span>
          <select v-model="activeCategory">
            <option value="all">全部</option>
            <option v-for="category in categories" :key="category.value" :value="category.value">
              {{ category.label }}
            </option>
          </select>
        </label>

        <label class="select-field">
          <span>主题选择</span>
          <select v-model="activeTheme">
            <option v-for="theme in themes" :key="theme.id" :value="theme.id">
              {{ theme.name }}
            </option>
          </select>
        </label>

        <div class="control-meta">
          <span>Visible {{ filteredCount }}</span>
          <span>{{ currentTheme.name }}</span>
          <span>Total {{ stats.total }}</span>
        </div>
      </div>

      <div ref="boardRef" class="board-wrap" @mouseleave="clearActiveElement">
        <div class="periodic-board">
          <div class="axis-label period-label">Period</div>
          <div class="axis-label group-label">Group</div>

          <div
            v-for="group in 18"
            :key="`group-${group}`"
            class="group-index"
            :style="{ gridColumn: group + 1, gridRow: 1 }"
          >
            {{ group }}
          </div>

          <div
            v-for="period in 7"
            :key="`period-${period}`"
            class="period-index"
            :style="{ gridColumn: 1, gridRow: period + 1 }"
          >
            {{ period }}
          </div>

          <div class="series-tag lanthanide-tag">La-Lu</div>
          <div class="series-tag actinide-tag">Ac-Lr</div>

          <button
            v-for="element in elements"
            :key="element.symbol"
            class="element-tile"
            :class="{
              active: activeElement?.symbol === element.symbol,
              muted: !isVisible(element),
            }"
            :style="{
              '--tile-glow': element.accent,
              gridColumn: element.gridColumn + 1,
              gridRow: element.gridRow + 1,
            }"
            @mouseenter="focusElement(element, $event)"
            @focus="focusElement(element, $event)"
            @blur="clearActiveElement"
          >
            <span class="number">{{ element.number }}</span>
            <strong class="symbol">{{ element.symbol }}</strong>
            <span class="name">{{ element.chineseName }}</span>
            <span class="mass">{{ element.atomicMass }}</span>
          </button>
        </div>

        <aside
          v-if="activeElement"
          class="floating-detail-card"
          :style="{ ...floatingCardStyle, '--panel-glow': activeElement.accent }"
        >
          <div class="floating-topline">
            <span>{{ activeElement.categoryLabel }}</span>
            <span>{{ activeElement.number }}</span>
          </div>

          <div class="floating-main">
            <div class="floating-symbol">
              <strong>{{ activeElement.symbol }}</strong>
              <small>{{ activeElement.atomicMass }}</small>
            </div>

            <div>
              <h2>{{ activeElement.chineseName }}</h2>
              <p class="latin-name">{{ activeElement.name }}</p>
              <p class="description">{{ activeElement.useCase }}</p>
            </div>
          </div>

          <div class="floating-metrics">
            <article>
              <span>Period / Group</span>
              <strong>{{ activeElement.period }} / {{ activeElement.group }}</strong>
            </article>
            <article>
              <span>Shell Hint</span>
              <strong>{{ activeElement.electronShellHint }}</strong>
            </article>
            <article>
              <span>Discovery Era</span>
              <strong>{{ activeElement.discoveryEra }}</strong>
            </article>
            <article>
              <span>Theme</span>
              <strong>{{ currentTheme.name }}</strong>
            </article>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
