import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const emoji = [
    '\u1F600', '\u1F601', '\u1F606', '\u1F605',
    '\u1F923', '\u1F602', '\u1F642', '\u1F643',
    '\u1F609', '\u1F60A', '\u1F607', '\u1F970',
    '\u1F60D', '\u1F929', '\u1F618', '\u1F617',
    '\u263A', '\u1F61A', '\u1F619', '\u1F61B',
    '\u1F61C', '\u1F92A', '\u1F61D', '\u1F911'
]
class EmoteGridList extends Component {


    render() {


        return (
            <GridList cellHeight={20} cols={10}>
                <GridListTile >
                    <p onClick={((e) => this.pickEmoji(e, '\u2728'))}>{'\u2728'}</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
                <GridListTile>
                    <p onClick={this.pickEmoji}>😀</p>
                </GridListTile>
            </GridList>
        )
    }
}

