<template>
  <div>
  <h3 style="text-align: center; margin-bottom:2%">Live Terminal Output</h3>
  <div class="terminal" ref="output">
    <div class="output">
      <div v-for="line in lines" :key="line.id" class="line">
        <span v-if="line.type === 'command'">{{ line.content }}</span>
        <span v-else class="output">{{ line.content }}</span>
        <div class="cursor" v-if="showCursor"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { BaseTable } from "@/components";

export default {
  components: {
    BaseTable
  },
  props: {
    worker: {
      default: null,
      required: true
    }
  },
  data() {
    return {
      lines: [],
      showCursor: false,
    };
  },
  methods: {
    addLine(content, type = 'output') {
      this.lines.push({ id: this.lines.length, type, content });
    },
    simulateTyping(text) {
      return new Promise(resolve => {
        let index = 0;

        const interval = setInterval(() => {
          if (index <= text.length - 1) {
            this.lines[this.lines.length - 1].content += text[index];
            index++;
          } else {
            clearInterval(interval);
            this.addLine(''); // Add a new line after typing is complete
            // Scroll to the bottom of the output div

            resolve();

          }
        }, 10); // Typing speed
      });
    },
    async startTyping() {
      if (this.working) return; // If already working, do nothing
      this.working = true;

      this.addLine(''); // Start with an empty line
      for (const output of this.worker.output) {
        await this.simulateTyping(output);
        const outputElement = this.$refs.output;
        outputElement.scrollTop = outputElement.scrollHeight;
      }

      this.working = false;
    },
  },
  watch: {
    'worker.output': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.startTyping();
        }
      },
      deep: true, // Watch for deep changes within the object
    },
  },
  mounted() {
    this.startTyping()
  },
};
</script>

<style>
.terminal {
  font-family: monospace;
  background-color: black;
  color: rgb(63, 247, 35); /* blue text */
  height: 46vh;
  overflow-y: auto;
  border: 1px solid white;
}

.output {
  padding: 5px;
}

.line {
  margin: 2px 0;
}

.output {
  color: rgb(72, 253, 52); /* Green text */
}

.cursor {
  display: inline-block;
  vertical-align: text-bottom;
  width: 8px;
  height: 1.2em;
  background: #00ff00; /* Green cursor */
  animation: blink 1s infinite; /* Blinking animation */
}

@keyframes blink {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
