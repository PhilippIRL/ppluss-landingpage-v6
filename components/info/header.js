import React from "react";
import Link from "next/link";

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <style jsx>{`
                    header {
                        height: 50px;
                        overflow-x: auto;
                        overflow-y: hidden;
                        display: flex;
                        justify-content: space-between;
                    }

                    .back {
                        display: flex;
                        align-items: center;
                        margin-left: 10px;
                        cursor: pointer;
                        margin-right: 20px;
                    }

                    .back-arrow {
                        fill: #fff;
                        width: 25px;
                    }

                    .back-text {
                        margin-left: 6px;
                        font-weight: bold;
                        font-size: 18px;
                        white-space: nowrap;
                    }

                    .links {
                        display: flex;
                        justify-content: flex-end;
                        margin-right: 10px;
                        margin-left: 20px;
                    }

                    .header-link {
                        display: flex;
                        align-items: center;
                        margin-left: 7px;
                        margin-right: 7px;
                        cursor: pointer;
                    }

                    .header-link-text {
                        font-size: 20px;
                        white-space: nowrap;
                    }

                `}</style>
                <Link href="/">
                    <div className="back">
                        <svg className="back-arrow" viewBox="0 0 492 492"><g><path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
                        C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
                        c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
                        l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/></g></svg>
                        <span className="back-text">Zurück zur Homepage</span>
                    </div>
                </Link>
                <div className="links">
                    <Link href="/more.html">
                        <div className="header-link">
                            <span className="header-link-text">Test 1</span>
                        </div>
                    </Link>
                    <Link href="/more2.html">
                        <div className="header-link">
                            <span className="header-link-text">Test 2</span>
                        </div>
                    </Link>
                    <Link href="/more3.html">
                        <div className="header-link">
                            <span className="header-link-text">Test 3</span>
                        </div>
                    </Link>
                </div>
            </header>
        )
    }
}