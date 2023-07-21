/** @format */


/**
 * @description
 * 页面主要内容显示区域
 * Layout布局风格组件
 * */


interface PropsData {
    element: any;
}

export const Loader = (props: PropsData) => {
    return (
        <div
            style={{ width:"100%",background:"white" }}
        >
            {props.element}
        </div>
    );
}
export default Loader;
