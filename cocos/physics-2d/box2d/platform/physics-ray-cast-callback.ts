/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/**
 * @packageDocumentation
 * @hidden
 */
import b2 from '@cocos/box2d';
import { Vec2 } from '../../../core';
import { ERaycast2DType } from '../../framework';

export class PhysicsRayCastCallback extends b2.RayCastCallback {
    _type = ERaycast2DType.Closest;
    _fixtures: b2.Fixture[] = [];
    _points: Vec2[] = [];
    _normals: Vec2[] = [];
    _fractions: number[] = [];

    _mask = 0xffffffff;

    init (type: ERaycast2DType, mask: number) {
        this._type = type;
        this._mask = mask;
        this._fixtures.length = 0;
        this._points.length = 0;
        this._normals.length = 0;
        this._fractions.length = 0;
    }

    ReportFixture (fixture: b2.Fixture, point, normal, fraction) {
        if ((fixture.GetFilterData().categoryBits & this._mask) === 0) {
            return 0;
        }

        if (this._type === ERaycast2DType.Closest) {
            this._fixtures[0] = fixture;
            this._points[0] = point;
            this._normals[0] = normal;
            this._fractions[0] = fraction;
            return fraction;
        }

        this._fixtures.push(fixture);
        this._points.push(new Vec2(point.x, point.y));
        this._normals.push(new Vec2(normal.x, normal.y));
        this._fractions.push(fraction);

        if (this._type === ERaycast2DType.Any) {
            return 0;
        } else if (this._type >= ERaycast2DType.All) {
            return 1;
        }

        return fraction;
    }

    getFixtures () {
        return this._fixtures;
    }

    getPoints () {
        return this._points;
    }

    getNormals () {
        return this._normals;
    }

    getFractions () {
        return this._fractions;
    }
}
