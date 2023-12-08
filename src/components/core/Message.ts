// message.ts
import { message as antMessage } from 'ant-design-vue';

const customMessage = {
  success: (content: string, duration: number) => {
    antMessage.success({
      content,
      duration,
      style: {
        // background: 'url("/src/assets/img/message.png") no-repeat', // 替换为实际的背景图片路径
        color: 'green', // 自定义文字颜色
        fontSize: '16px', // 自定义文字大小
        // 其他自定义样式
        marginTop: '40vh',
      },
    });
  },
  error: (content: string, duration: number) => {
    antMessage.error({
      content,
      style: {
        // background: 'url("/src/assets/img/message.png")',
        color: 'red',
        fontSize: '16px',
        // 其他自定义样式
        marginTop: '40vh',
      },
    });
  },
  warning: (content: string, duration: number) => {
    antMessage.warning({
      content,
      style: {
        // background: 'url("/src/assets/img/message.png")',
        color: 'orange',
        fontSize: '16px',
        // 其他自定义样式
        marginTop: '40vh',
      },
    });
  },
};

export default customMessage;
